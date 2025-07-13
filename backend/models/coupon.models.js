import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const couponSchema = new mongoose.Schema(
    {
        couponCode: {
            type: String,
            unique: true,
            required: true,
        },
        couponImage: {
            type: String
        },
        description: {
            type: String,
            required: true,
        },
        offerStarts: {
            type: Date,
            required: true
        },
        offerEnds: {
            type: Date,
            required: true
        },
        discountAmount: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true
        }
    }, { timestamps: true });

couponSchema.plugin(mongooseAggregatePaginate);

export const Coupon = mongoose.model("Coupon", couponSchema);