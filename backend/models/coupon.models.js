import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
      index: true
    },
    couponImage: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["FLAT", "PERCENTAGE"],
      required: true,
    },
    discountValue: {
      // flat amount, or percentage points if discountType is PERCENTAGE
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscountAmount: {
      // cap for PERCENTAGE type discounts
      type: Number,
      default: null,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    usageLimitTotal: {
      // null = unlimited
      type: Number,
      default: null,
    },
    usageLimitPerUser: {
      type: Number,
      default: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    offerStarts: {
      type: Date,
      required: true,
      index: true
    },
    offerEnds: {
      type: Date,
      required: true,
      index: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
      index: true
    },
  },
  { timestamps: true }
);


couponSchema.plugin(mongooseAggregatePaginate);

export const Coupon = mongoose.model("Coupon", couponSchema);