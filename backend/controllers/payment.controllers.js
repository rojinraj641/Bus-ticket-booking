import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import razorpay from "../utils/razorpay.js";

const payment = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    try {
        if (!amount) {
            throw new ApiError(400, "Amount is required");
        }
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }
        const order = await razorpay.orders.create(options);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    orderId: order.id,
                    amount: order.amount,
                    currency: order.currency,
                },
                "Razorpay order created successfully"
            )
        );
    }catch(error){
        throw new ApiError(500, "Internal Server down");
    }
})

export default payment;