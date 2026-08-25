import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";

const fetchSeats = asyncHandler(async (req, res) => {
    try {
        const { busId } = req.query;
        if (!busId) {
            throw new ApiError(400, "busId query param is required");
        }
        const seats = await Seats.find({bus: busId}).sort({seatNumber: 1});
        console.log(seats)
        if (seats.length >= 1) {
            return res.status(200).json(new ApiResponse(200, seats, "Seats fetched successfully"));
        }
        if (seats.length == 0) {
            return res.status(200).json(new ApiResponse(200, "No seats found for the selected bus"));
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong"));
    }
});

export default fetchSeats;