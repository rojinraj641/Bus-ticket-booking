import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Booking } from '../models/booking.models.js';

const booking = asyncHandler(async (req, res) => {
    try {
        const {userId}= req.body;
        const bookingData = await Booking.find({ userId: userId });
        return res.status(200).json(new ApiResponse(200, bookingData, 'Bookings fetched successfully'))
    }
    catch (error) {
        throw new ApiError(404, 'No bookings are made by the user');
    }
})

export default booking;