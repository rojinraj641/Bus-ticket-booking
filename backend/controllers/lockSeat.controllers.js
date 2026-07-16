import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";
import { User } from "../models/user.models.js";

const lockSeats = asyncHandler(async(req,res)=>{
    try{
        const {seatIds} = req.body;
        if(!req.user){
            throw new ApiError(404, 'User not found');
        }
        const result = await Seats.updateMany(
            {_id: {$in: seatIds},status: "Available",lockedBy: null},
            {$set: {
                lockedBy: req.user._id,
                timeToLock: new Date(Date.now() + 10*60*1000)
            }}
        )
        return res.status(200).json(new ApiResponse(200, result, 'Seats locked for 10 min'))
    }
    catch(error){
        throw new ApiError(501, 'All error occured during locking the seats')
    }
})
export default lockSeats;