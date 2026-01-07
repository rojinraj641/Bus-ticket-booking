import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Seats } from "../models/seats.models.js";

const locked = asyncHandler( async (req,res)=>{
    try{
        const {selected, busId} = req.query;
        const selectedSeats = selected?.split(',') || [];
        const updated = await Promise.all(
            selectedSeats.map(async(seatNumber)=>{
                const lock = await Seats.findOneAndUpdate(
                    {busId: busId, seatNumber: seatNumber},
                    {
                        status: 'Locked',
                        timeToLock: new Date(Date.now() + 10 * 60 * 1000)
                    },
                    {new: true}
                )
                return lock;
            })
        ).filter(Boolean)
        console.log(updated);
        return res.status(200).json(new ApiResponse(200, updated, "Seats fetched successfully"));
    }
    catch(error){
        throw new ApiError(500, 'Internal Sever error');
    }
})

export default locked;