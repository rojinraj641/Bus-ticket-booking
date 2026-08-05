import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDistanceFromPlaces } from "../api/distance.helper.js";
import { buildTimeMatch } from "../utils/buildTimeMatch.js";

const filteredResult = asyncHandler(async (req, res) => {
  try{
    const {boarding, destination, date, time, arrivalTime, departureTime, amenities, busType} = req.query;
    if(!boarding || !destination || !date) {
      throw new ApiError(400, "Boarding point, destination point and date are required");
    }
  } catch(error) {
    throw new ApiError(500, "Error occurred while filtering results");
  }
});

export default filteredResult;


