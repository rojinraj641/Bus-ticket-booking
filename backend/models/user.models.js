import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            match: /\S+@\S+\.\S+/,
            trim: true
        },
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus"
        },
        passengers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Passenger"
        },
        wallet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wallet"
        },
        transactions: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        },
        coupons: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon"
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },{timestamps: true},
);

userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
