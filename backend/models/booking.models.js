import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true
        },
        transactionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: true
        },
        busId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true
        },
        passengerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Passenger",
            required: true
        },
        seatNumber: {
            type: [Number],
            required: true,
        },
        bookingDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        journeyDate: {
            type: Date,
            required: true
        },
        bookingStatus: {
            type: String,
            required: true,
            enum: ["Successful","Pending","Failed","Cancelled"]
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ["Successful","Pending","Failed"]
        }
    }, { timestamps: true });

bookingSchema.plugin(mongooseAggregatePaginate)

export const Booking = mongoose.model("Booking", bookingSchema);