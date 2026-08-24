import asyncHandler from "../utils/asyncHandler.js";
import { Trip } from "../models/trip.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => String(item).split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseTimeRanges = (value) => {
  if (!value) return [];

  const parts = normalizeArray(value);

  const ranges = [];

  for (const part of parts) {
    const [startStr, endStr] = part.split("-");

    const start = Number(startStr);
    const end = Number(endStr);

    if (
      Number.isNaN(start) ||
      Number.isNaN(end) ||
      start < 0 ||
      start > 23 ||
      end < 0 ||
      end > 24 ||
      start >= end
    ) {
      continue;
    }

    ranges.push({ start, end });
  }
  return ranges;
};

const buildTimeRangeMatch = (field, ranges) => {
  if (!ranges.length) return null;

  const istHour = {
    $toInt: {
      $dateToString: {
        date: field,
        format: "%H",
        timezone: "Asia/Kolkata",
      },
    },
  };

  return {
    $expr: {
      $or: ranges.map((range) => ({
        $and: [
          { $gte: [istHour, range.start] },
          { $lt: [istHour, range.end] },
        ],
      })),
    },
  };
};

const parseSearchDate = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();

    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      const [year, month, day] = trimmed.split("-").map(Number);

      return new Date(year, month - 1, day);
    }

    // DD-MM-YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
      const [day, month, year] = trimmed.split("-").map(Number);

      return new Date(year, month - 1, day);
    }

    const parsed = new Date(trimmed);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  return null;
};

// Escape special regex characters from user input
const escapeRegex = (value) => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const filteredResult = asyncHandler(async (req, res) => {
  const {
    boarding,
    destination,
    date,
    arrivalTime = null,
    departureTime = null,
    amenities = [],
    busType = [],
  } = req.query;

  // ----------------------------------------
  // 1. Validate required fields
  // ----------------------------------------

  if (!boarding || !destination || !date) {
    throw new ApiError(
      400,
      "Boarding point, destination point and date are required"
    );
  }

  // ----------------------------------------
  // 2. Parse date
  // ----------------------------------------
  const selectedDate = parseSearchDate(date);

  if (!selectedDate || Number.isNaN(selectedDate.getTime())) {
    throw new ApiError(400, "Please provide a valid date");
  }

  const selectedDayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(selectedDate);

  // const startOfDay = new Date(selectedDate);
  // startOfDay.setHours(0, 0, 0, 0);

  // const endOfDay = new Date(selectedDate);
  // endOfDay.setHours(23, 59, 59, 999);

  // ----------------------------------------
  // 3. Normalize filters
  // ----------------------------------------

  const requestedAmenities = normalizeArray(amenities);
  const requestedBusTypes = normalizeArray(busType);

  const requestedDepartureTimeRanges = parseTimeRanges(departureTime);
  const requestedArrivalTimeRanges = parseTimeRanges(arrivalTime);

  // ----------------------------------------
  // 4. Create regexes for city matching
  // ----------------------------------------

  const normalizedBoarding = boarding.trim();
  const normalizedDestination = destination.trim();

  const boardingRegex = new RegExp(
    `^${escapeRegex(normalizedBoarding)}$`,
    "i"
  );

  const destinationRegex = new RegExp(
    `^${escapeRegex(normalizedDestination)}$`,
    "i"
  );

  // ----------------------------------------
  // 5. Validate time filters
  // ----------------------------------------

  const invalidDepartureRange = requestedDepartureTimeRanges.some(
    (range) => range.start < 0 || range.start > 23 || range.end < 0 || range.end > 24
  );

  const invalidArrivalRange = requestedArrivalTimeRanges.some(
    (range) => range.start < 0 || range.start > 23 || range.end < 0 || range.end > 24
  );

  if (invalidDepartureRange) {
    throw new ApiError(
      400,
      "Departure time ranges must contain valid hours (0-23)"
    );
  }

  if (invalidArrivalRange) {
    throw new ApiError(
      400,
      "Arrival time ranges must contain valid hours (0-23)"
    );
  }

  // ----------------------------------------
  // 6. Trip matching
  // ----------------------------------------

  // const tripMatch = {
  //   status: "SCHEDULED",

  //   departureDate: {
  //     $gte: startOfDay,
  //     $lt: endOfDay,
  //   },
  // };

  const pipeline = [
    // Find scheduled trips for the requested date
    // {
    //   $match: tripMatch,
    // },

    // Get route
    {
      $lookup: {
        from: "routes",
        localField: "route",
        foreignField: "_id",
        as: "routeData",
      },
    },

    {
      $unwind: "$routeData",
    },

    // Route must be active and operate on requested day
    {
      $match: {
        "routeData.status": "ACTIVE",
        "routeData.operatingDays": selectedDayName,
      },
    },

    // ----------------------------------------
    // Find requested boarding point
    // ----------------------------------------

    {
      $set: {
        boardingPoint: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$routeData.stoppingPoints",
                as: "point",

                cond: {
                  $and: [
                    {
                      $regexMatch: {
                        input: "$$point.city",
                        regex: boardingRegex,
                      },
                    },

                    {
                      $eq: [
                        "$$point.isBoardingPoint",
                        true,
                      ],
                    },
                  ],
                },
              },
            },
            0,
          ],
        },

        // ----------------------------------------
        // Find requested destination point
        // ----------------------------------------

        destinationPoint: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$routeData.stoppingPoints",
                as: "point",

                cond: {
                  $and: [
                    {
                      $regexMatch: {
                        input: "$$point.city",
                        regex: destinationRegex,
                      },
                    },

                    {
                      $eq: [
                        "$$point.isDroppingPoint",
                        true,
                      ],
                    },
                  ],
                },
              },
            },
            0,
          ],
        },
      },
    },

    // ----------------------------------------
    // Make sure both points exist
    // and boarding comes before destination
    // ----------------------------------------

    {
      $match: {
        $expr: {
          $and: [
            {
              $ne: [
                {
                  $ifNull: ["$boardingPoint", null],
                },
                null,
              ],
            },

            {
              $ne: [
                {
                  $ifNull: ["$destinationPoint", null],
                },
                null,
              ],
            },

            {
              $lt: [
                "$boardingPoint.order",
                "$destinationPoint.order",
              ],
            },
          ],
        },
      },
    },
    // ---------------------------------------------------------------
    // Converting the string value of departureTime into HH:MM format
    // ---------------------------------------------------------------
    {
      $set: {
        tripDepartureDateTime: {
          $dateFromString: {
            dateString: {
              $concat: [
                date,
                "T",
                "$departureTime",
                ":00"
              ]
            },
            format: "%Y-%m-%dT%H:%M:%S",
            timezone: "Asia/Kolkata"
          }
        }
      }
    },
    // ----------------------------------------
    // Calculate actual segment times
    // ----------------------------------------

    {
      $set: {
        requestedDepartureDateTime: {
          $dateAdd: {
            startDate: "$tripDepartureDateTime",
            unit: "minute",
            amount: "$boardingPoint.offsetFromStartMinutes",
            timezone: "Asia/Kolkata",
          },
        },

        requestedArrivalDateTime: {
          $dateAdd: {
            startDate: "$tripDepartureDateTime",
            unit: "minute",
            amount: "$destinationPoint.offsetFromStartMinutes",
            timezone: "Asia/Kolkata",
          },
        },
      },
    },

    // ----------------------------------------
    // Departure time filter
    // ----------------------------------------

    ...(requestedDepartureTimeRanges.length
      ? [
        {
          $match: buildTimeRangeMatch(
            "$requestedDepartureDateTime",
            requestedDepartureTimeRanges
          ),
        },
      ]
      : []),

    // ----------------------------------------
    // Arrival time filter
    // ----------------------------------------

    ...(requestedArrivalTimeRanges.length
      ? [
        {
          $match: buildTimeRangeMatch(
            "$requestedArrivalDateTime",
            requestedArrivalTimeRanges
          ),
        },
      ]
      : []),

    // ----------------------------------------
    // Get bus
    // ----------------------------------------

    {
      $lookup: {
        from: "buses",
        localField: "bus",
        foreignField: "_id",
        as: "busData",
      },
    },

    {
      $unwind: "$busData",
    },

    // Bus must be active
    {
      $match: {
        "busData.status": "ACTIVE",
      },
    },

    // ----------------------------------------
    // Bus type filter
    // ----------------------------------------

    ...(requestedBusTypes.length
      ? [
        {
          $match: {
            "busData.busType": {
              $in: requestedBusTypes.map(
                (type) =>
                  new RegExp(
                    `^${escapeRegex(type)}$`,
                    "i"
                  )
              ),
            },
          },
        },
      ]
      : []),

    // ----------------------------------------
    // Amenities filter
    // ----------------------------------------

    ...(requestedAmenities.length
      ? [
        {
          $match: {
            "busData.amenities": {
              $in: requestedAmenities.map(
                (amenity) =>
                  new RegExp(
                    `^${escapeRegex(amenity)}$`,
                    "i"
                  )
              ),
            },
          },
        },
      ]
      : []),

    // ----------------------------------------
    // Final response
    // ----------------------------------------

    {
      $project: {
        _id: "$busData._id",

        tripId: "$_id",

        busName: "$busData.busName",

        busNumber: "$busData.busNumber",

        busType: "$busData.busType",

        amenities: "$busData.amenities",

        averageRating: "$busData.averageRating",

        ratingCount: "$busData.ratingCount",

        totalSeats: "$busData.totalSeats",

        images: "$busData.images",

        // Requested segment times
        departureDateTime:
          "$requestedDepartureDateTime",

        arrivalDateTime:
          "$requestedArrivalDateTime",

        departureTime: {
          $dateToString: {
            format: "%H:%M",
            date: "$requestedDepartureDateTime",
          },
        },

        arrivalTime: {
          $dateToString: {
            format: "%H:%M",
            date: "$requestedArrivalDateTime",
          },
        },

        // Requested boarding/destination
        boardingPoint: "$boardingPoint.city",

        destinationPoint:
          "$destinationPoint.city",

        // Useful for pricing / display
        distance: {
          $subtract: [
            "$destinationPoint.distanceFromStartKm",
            "$boardingPoint.distanceFromStartKm",
          ],
        },

        basePrice: 1,

        availableSeatsCount: 1,
      },
    },
  ];

  // ----------------------------------------
  // 8. Execute aggregation
  // ----------------------------------------
  let busList;
  try {
    busList = await Trip.aggregate(pipeline);
    console.log("Bus list are", busList);
  } catch (aggregateError) {
    throw new ApiError(
      500,
      `Unable to fetch buses for the selected route: ${aggregateError.message}`
    );
  }

  // ----------------------------------------
  // 9. Response
  // ----------------------------------------

  return res.status(200).json(
    new ApiResponse(
      200,
      { busList },
      "Buses fetched successfully"
    )
  );
});

export default filteredResult;