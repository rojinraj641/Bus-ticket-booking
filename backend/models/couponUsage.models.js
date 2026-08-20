import mongoose from "mongoose";

// Tracks each redemption so "usageLimitPerUser" can be enforced with a
// simple unique-index-backed count instead of scanning all bookings.
const couponUsageSchema = new mongoose.Schema(
  {
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

export const CouponUsage = mongoose.model("CouponUsage", couponUsageSchema);

couponUsageSchema.index({ coupon: 1, user: 1, booking: 1 }, { unique: true });