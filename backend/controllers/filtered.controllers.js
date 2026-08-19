import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import { Trip } from "../models/trip.models.js";
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

const filteredResult = asyncHandler(async (req, res) => {
  const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
  const {
    boarding,
    destination,
    date,
    arrivalTime,
    departureTime,
    amenities,
    busType,
  } = payload;

  if (!boarding || !destination || !date) {
    throw new ApiError(400, "Boarding point, destination point and date are required");
  }

  const selectedDate = new Date(date);
  if (Number.isNaN(selectedDate.getTime())) {
    throw new ApiError(400, "Please provide a valid date");
  }

  const startOfDay = new Date(selectedDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

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
        "routeData.sourceCity": { $regex: new RegExp(`^${boarding.trim()}$`, "i") },
        "routeData.destinationCity": { $regex: new RegExp(`^${destination.trim()}$`, "i") },
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

  const busList = await Trip.aggregate(pipeline);
  const tripIds = busList.map((bus) => bus.tripId);
  const seats = tripIds.length ? await Seats.find({ trip: { $in: tripIds } }).lean() : [];

  return res.status(200).json(
    new ApiResponse(200, { busList, seats }, "Buses fetched successfully")
  );
});

export default filteredResult;


