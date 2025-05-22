import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true
        },
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true
        },
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: true
        },
        passengerId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Passenger",
            required: true
        }],
        bookingDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        departure:{
            boardingPoint:{type: String, required: true},
            time: {type: Date, required: true}
        },
        arrival: {
            destination: {type: String,required: true},
            time: {type: Date}
        },
        bookingStatus: {
            type: String,
            required: true,
            enum: ["Confirmed", "In Progress", "Cancelled"]
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    }, { timestamps: true });

bookingSchema.plugin(mongooseAggregatePaginate)

export const Booking = mongoose.model("Booking", bookingSchema);