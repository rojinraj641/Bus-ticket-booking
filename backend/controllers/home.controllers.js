import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.models.js"
import { Coupon } from "../models/coupon.models.js";

const homeData = asyncHandler(async (req, res) => {
    try {
        const [topRoutesData, couponsData] = await Promise.all([
            Booking.aggregate([
                {
                    $group: {
                        _id: {
                            from: "$departure.boardingPoint",
                            to: "$arrival.destination"
                        },
                        totalBookings: { $sum: 1 }
                    }
                },
                { $sort: { totalBookings: -1 } },
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        from: "$_id.from",
                        to: "$_id.to",
                        totalBooking: 1
                    }
                }
            ]),
            Coupon.aggregate([
                {
                    $project: {
                        _id: 0,
                        couponCode: 1,
                        couponImage: 1,
                        description: 1
                    }
                }
            ])
        ])
        return res.status(200).json(new ApiResponse(200, "Data fetched", {topRoute: topRoutesData,coupons: couponsData}));
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
})

export { homeData } 