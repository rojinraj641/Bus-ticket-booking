import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
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
        departurePoint: {
            type: String,
            required: true
        },
        departureTime: {
            type: String,
            required: true
        },
        destinationPoint: {
            type: String,
            required: true
        },
        arrivingTime: {
            type: String,
            required: true
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