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

const normalizeTime = (value) => {
  if (!value) return null;

  if (Array.isArray(value)) {
    return value[0];
  }

  return String(value);
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

  const requestedDepartureTime = normalizeTime(departureTime);
  const requestedArrivalTime = normalizeTime(arrivalTime);

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

  const requestedDepartureParts = requestedDepartureTime
    ? requestedDepartureTime
      .split(":")
      .map((part) => Number.parseInt(part, 10))
    : null;

  const requestedArrivalParts = requestedArrivalTime
    ? requestedArrivalTime
      .split(":")
      .map((part) => Number.parseInt(part, 10))
    : null;

  if (
    requestedDepartureParts &&
    (
      requestedDepartureParts.length !== 2 ||
      requestedDepartureParts.some((part) => Number.isNaN(part)) ||
      requestedDepartureParts[0] < 0 ||
      requestedDepartureParts[0] > 23 ||
      requestedDepartureParts[1] < 0 ||
      requestedDepartureParts[1] > 59
    )
  ) {
    throw new ApiError(
      400,
      "Departure time must be in HH:MM format"
    );
  }

  if (
    requestedArrivalParts &&
    (
      requestedArrivalParts.length !== 2 ||
      requestedArrivalParts.some((part) => Number.isNaN(part)) ||
      requestedArrivalParts[0] < 0 ||
      requestedArrivalParts[0] > 23 ||
      requestedArrivalParts[1] < 0 ||
      requestedArrivalParts[1] > 59
    )
  ) {
    throw new ApiError(
      400,
      "Arrival time must be in HH:MM format"
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

    // ----------------------------------------
    // Calculate actual segment times
    // ----------------------------------------

    {
      $set: {
        requestedDepartureDateTime: {
          $dateAdd: {
            startDate: "$departureDateTime",
            unit: "minute",
            amount:
              "$boardingPoint.offsetFromStartMinutes",
          },
        },

        requestedArrivalDateTime: {
          $dateAdd: {
            startDate: "$departureDateTime",
            unit: "minute",
            amount:
              "$destinationPoint.offsetFromStartMinutes",
          },
        },
      },
    },

    // ----------------------------------------
    // Departure time filter
    // ----------------------------------------

    ...(requestedDepartureParts
      ? [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    {
                      $hour:
                        "$requestedDepartureDateTime",
                    },
                    requestedDepartureParts[0],
                  ],
                },

                {
                  $eq: [
                    {
                      $minute:
                        "$requestedDepartureDateTime",
                    },
                    requestedDepartureParts[1],
                  ],
                },
              ],
            },
          },
        },
      ]
      : []),

    // ----------------------------------------
    // Arrival time filter
    // ----------------------------------------

    ...(requestedArrivalParts
      ? [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    {
                      $hour:
                        "$requestedArrivalDateTime",
                    },
                    requestedArrivalParts[0],
                  ],
                },

                {
                  $eq: [
                    {
                      $minute:
                        "$requestedArrivalDateTime",
                    },
                    requestedArrivalParts[1],
                  ],
                },
              ],
            },
          },
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