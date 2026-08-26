import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";

const lockSeats = asyncHandler(async(req,res)=>{
    try{
        const {seatIds} = req.body;
        const result = await Seats.updateMany(
            {_id: {$in: seatIds},status: "Available",lockedBy: null},
            {$set: {
                status: "Locked",
                lockExpiresAt: new Date(Date.now() + 15*60*1000)
            }}
        )
        return res.status(200).json(new ApiResponse(200, result, 'Seats locked for 15 min'))
    }
    catch(error){
        throw new ApiError(501, 'All error occured during locking the seats')
    }
})
export default lockSeats;