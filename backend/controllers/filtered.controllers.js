import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDistanceFromPlaces } from "../api/distance.helper.js";
import { convertHoursToHrMin } from "../utils/convertHr.js";
import addTime from "../utils/addTime.js"

const filteredResult = asyncHandler(async (req, res) => {
  const { boarding, destination, date } = req.query;

  if (!boarding || !destination || !date) {
    return res.status(400).json(
      new ApiError(400, null, "Missing required query params")
    );
  }

  const timestamp = Number(date);
  if (!Number.isFinite(timestamp)) {
    return res.status(400).json(
      new ApiError(400, null, "Invalid date")
    );
  }

  const dayName = new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const buses = await Bus.find({
    stoppingPoints: { $all: [boarding, destination] },
    day: dayName,
  });

  if (!buses.length) {
    return res.status(200).json(
      new ApiResponse(200, { busList: [] }, "No buses found")
    );
  }

  const availableBuses = buses.filter(bus => {
    const bIndex = bus.stoppingPoints.indexOf(boarding);
    const dIndex = bus.stoppingPoints.indexOf(destination);
    return bIndex < dIndex;
  });

  if (!availableBuses.length) {
    return res.status(200).json(
      new ApiResponse(200, { busList: [] }, "No buses for this route")
    );
  }

  let distance;
  try {
    distance = await getDistanceFromPlaces(boarding, destination);
  } catch {
    return res.status(503).json(
      new ApiError(503, null, "Distance service failed")
    );
  }

  const busesWithTime = availableBuses.map(bus => {
    const timeRequired = Math.ceil(distance / bus.averageSpeed);
    let duration = convertHoursToHrMin(timeRequired);
    let tripEndingTime = addTime(bus.boardingTime, duration);
    return {
      ...bus.toObject(),
      duration,
      tripEndingTime
    };
  });

  return res.status(200).json(
    new ApiResponse(200, { busList: busesWithTime }, "Success")
  );
});

export { filteredResult }