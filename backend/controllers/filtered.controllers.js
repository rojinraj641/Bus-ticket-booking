import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import { Trip } from "../models/trip.models.js";
import { Route } from "../models/route.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => String(item).split(",")).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
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

const canonicalCity = (value) => {
  if (!value || typeof value !== "string") return value;

  const normalized = value.trim();
  const aliases = {
    bangalore: "Bengaluru",
    bengaluru: "Bengaluru",
    hyderabad: "Hyderabad",
    chennai: "Chennai",
    vijayawada: "Vijayawada",
    coimbatore: "Coimbatore",
  };

  return aliases[normalized.toLowerCase()] || normalized;
};

const parseSearchDate = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      const [year, month, day] = trimmed.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

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

export const getRouteSuggestions = asyncHandler(async (req, res) => {
  const { q = "", type = "both" } = req.query;
  const search = String(q).trim();

  if (!search) {
    return res.status(200).json(new ApiResponse(200, { suggestions: [] }, "Suggestions fetched successfully"));
  }

  const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  let match = {};
  if (type === "boarding") {
    match = { sourceCity: { $regex: regex } };
  } else if (type === "destination") {
    match = { destinationCity: { $regex: regex } };
  } else {
    match = {
      $or: [{ sourceCity: { $regex: regex } }, { destinationCity: { $regex: regex } }],
    };
  }

  const matches = await Route.find(match, {
    sourceCity: 1,
    destinationCity: 1,
    _id: 0,
  })
    .limit(8)
    .lean();

  const suggestions = [...new Set(
    matches.flatMap((route) => {
      if (type === "boarding") return [route.sourceCity];
      if (type === "destination") return [route.destinationCity];
      return [route.sourceCity, route.destinationCity];
    })
  )].filter(Boolean);

  return res.status(200).json(new ApiResponse(200, { suggestions }, "Suggestions fetched successfully"));
});

const filteredResult = asyncHandler(async (req, res) => {
  try {
    const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
    const {
      boarding,
      destination,
      date,
      arrivalTime = null,
      departureTime = null,
      amenities = [],
      busType = [],
    } = payload;

    const normalizedBoarding = canonicalCity(boarding);
    const normalizedDestination = canonicalCity(destination);

    if (!normalizedBoarding || !normalizedDestination || !date) {
      throw new ApiError(400, "Boarding point, destination point and date are required");
    }

    const selectedDate = parseSearchDate(date);
    if (!selectedDate || Number.isNaN(selectedDate.getTime())) {
      throw new ApiError(400, "Please provide a valid date");
    }

    const selectedDayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(selectedDate);

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const requestedAmenities = normalizeArray(amenities);
    const requestedBusTypes = normalizeArray(busType);
    const requestedDepartureTime = normalizeTime(departureTime);
    const requestedArrivalTime = normalizeTime(arrivalTime);

    const tripMatch = {
      status: "SCHEDULED",
      departureDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

    const requestedDepartureParts = requestedDepartureTime
      ? requestedDepartureTime.split(":").map((part) => Number.parseInt(part, 10))
      : null;

    const requestedArrivalParts = requestedArrivalTime
      ? requestedArrivalTime.split(":").map((part) => Number.parseInt(part, 10))
      : null;

    if (requestedDepartureParts && (requestedDepartureParts.length !== 2 || requestedDepartureParts.some((part) => Number.isNaN(part)))) {
      throw new ApiError(400, "Departure time must be in HH:MM format");
    }

    if (requestedArrivalParts && (requestedArrivalParts.length !== 2 || requestedArrivalParts.some((part) => Number.isNaN(part)))) {
      throw new ApiError(400, "Arrival time must be in HH:MM format");
    }

    const pipeline = [
      { $match: tripMatch },
      {
        $lookup: {
          from: "routes",
          localField: "route",
          foreignField: "_id",
          as: "routeData",
        },
      },
      { $unwind: "$routeData" },
      {
        $match: {
          "routeData.status": "ACTIVE",
          "routeData.sourceCity": { $regex: new RegExp(`^${normalizedBoarding.trim()}$`, "i") },
          "routeData.destinationCity": { $regex: new RegExp(`^${normalizedDestination.trim()}$`, "i") },
          "routeData.operatingDays": selectedDayName,
        },
      },
      {
        $lookup: {
          from: "buses",
          localField: "bus",
          foreignField: "_id",
          as: "busData",
        },
      },
      { $unwind: "$busData" },
      {
        $match: {
          "busData.status": "ACTIVE",
        },
      },
      ...(requestedBusTypes.length
        ? [
            {
              $match: {
                "busData.busType": {
                  $in: requestedBusTypes.map((type) => new RegExp(`^${type}$`, "i")),
                },
              },
            },
          ]
        : []),
      ...(requestedAmenities.length
        ? [
            {
              $match: {
                "busData.amenities": {
                  $in: requestedAmenities.map((amenity) => new RegExp(`^${amenity}$`, "i")),
                },
              },
            },
          ]
        : []),
      ...(requestedDepartureParts !== null
        ? [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $hour: "$departureDateTime" }, requestedDepartureParts[0]] },
                    { $eq: [{ $minute: "$departureDateTime" }, requestedDepartureParts[1] || 0] },
                  ],
                },
              },
            },
          ]
        : []),
      ...(requestedArrivalParts !== null
        ? [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $hour: "$arrivalDateTime" }, requestedArrivalParts[0]] },
                    { $eq: [{ $minute: "$arrivalDateTime" }, requestedArrivalParts[1] || 0] },
                  ],
                },
              },
            },
          ]
        : []),
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
          departureDateTime: 1,
          arrivalDateTime: 1,
          departureTime: {
            $dateToString: {
              format: "%H:%M",
              date: "$departureDateTime",
            },
          },
          arrivalTime: {
            $dateToString: {
              format: "%H:%M",
              date: "$arrivalDateTime",
            },
          },
          basePrice: 1,
          availableSeatsCount: 1,
        },
      },
    ];

    let busList;

    try {
      busList = await Trip.aggregate(pipeline);
    } catch (aggregateError) {
      throw new ApiError(500, `Unable to fetch buses for the selected route: ${aggregateError.message}`);
    }

    return res.status(200).json(
      new ApiResponse(200, { busList }, "Buses fetched successfully")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(500, `Error occurred while filtering results: ${error.message}`);
    }

    throw new ApiError(500, "Error occurred while filtering results");
  }
});

export default filteredResult;


