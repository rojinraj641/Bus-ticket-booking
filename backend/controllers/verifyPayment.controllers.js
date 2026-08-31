import crypto from "crypto";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new ApiError(400, "Payment verification failed");
    }

    // Payment is verified
    console.log("Payment verified successfully");
    return res.status(200).json(new ApiResponse(200, "Payment verified successfully"));

  } catch (error) {
    console.error("Payment verification error:", error);
    throw new ApiError(500, "Something went wrong while verifying payment");
  }
};

export default verifyPayment;