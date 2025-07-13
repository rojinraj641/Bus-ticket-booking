import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Coupon } from "../models/coupon.models.js";

const payment = asyncHandler(async(req, res)=>{
    try{
        const today = new Date()
        const activeCoupons = await Coupon.aggregate([
            {
                $match:{
                    offerStarts: {$lte: today},
                    offerEnds: {$gte: today}
                }
            },
            {
                $project:{
                    _id: 0,
                    couponCode: 1,
                    description: 1,
                    discountAmount: 1,
                    isActive: 1
                }
            }
        ])
        if(activeCoupons.length==0){
            throw new ApiError(404, 'No active coupons');
        }
        else{
            return res.status(200).json(new ApiResponse(200,activeCoupons))
        }
    }
    catch(error){
        throw new ApiError(500, 'Coupons fetching failed');
    }
})

export { payment };