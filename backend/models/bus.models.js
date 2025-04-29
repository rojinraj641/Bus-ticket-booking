import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const busSchema = new mongoose.Schema(
    {
        busName: {
            type: String,
            required: true
        },
        boardingPoint: {
            type: String,
            required: true
        },
        droppingPoint: {
            type: String,
            required: true
        },
        stoppingPoints: {
            type: [String],
            default: [],
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        ratings: {
            type: Number,
            required: true
        },
        busType: {
            type: String,
            required: true,
            enum: ["Non AC Sleeper","AC Sleeper","Seater"]
        },
        amentities: {
            type: [String],
            required: true
        }
    }, { timestamps: true });

busSchema.plugin(mongooseAggregatePaginate);

export const Bus = mongoose.model("Bus", busSchema)