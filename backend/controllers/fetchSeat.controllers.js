import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";

const fetchSeats = asyncHandler(async (req, res) => {
    console.log('Hello I am inside fetchSeats')
    const { busId } = req.query;
    console.log(`BusId for querying is: ${busId}`)
    if (!busId) {
        throw new ApiError(400, "busId query param is required");
    }

    const seats = await Seats.find({ busId: busId });
    console.log(`Seats found are: ${seats}`);

    return res.status(200).json(new ApiResponse(200, seats, "Seats fetched successfully"));
});

export default fetchSeats;
