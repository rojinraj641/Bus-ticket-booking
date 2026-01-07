import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";

const fetchSeats = asyncHandler(async (req, res) => {
    const { busId } = req.query;
    
    if (!busId) {
        throw new ApiError(400, "busId query param is required");
    }

    const seats = await Seats.find({ busId: busId });

    return res.status(200).json(new ApiResponse(200, seats, "Seats fetched successfully"));
});

export default fetchSeats;