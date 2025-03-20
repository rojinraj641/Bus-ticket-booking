import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
    {
        couponId: { type: String, required: true, unique: true },
        couponDescription: { type: String, required: true },
        offerStarting: { type: Date, required: true },
        offerEnding: { type: Date, required: true },
        isActive: { type: Boolean, required: true },
        discountAmount: { type: Number, required: true },

    }, { timestamps: true });

export const Coupon = mongoose.model("Coupon", couponSchema);