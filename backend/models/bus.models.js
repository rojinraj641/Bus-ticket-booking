import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const busSchema = new mongoose.Schema(
    {
        busName: {
            type: String,
            required: true
        },
        day:{
            type: [String],
            enum: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            required: true
        },
        boardingTime: {
            type: String,
            required: true
        },
        ratings: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
            required: true
        },
        averageSpeed: {
            type: Number,
            required: true,
            default: 40
        },
        busType:{
            type: String,
            required: true
        },
        isACAvailable:{
            type: Boolean,
            required: true,
            default: false
        },
        stoppingPoints: {
            type: [String],
            required: true
        },
        totalSeats: {
            type: Number,
            required: true
        },
        totalDeck: {
            type: Number,
            default: 1,
            required: true
        },
        totalTravelTime: {
            type: Number,
            required: true
        },
        amenities: {
            type: [String],
            required: true
        },
    }, { timestamps: true });

busSchema.plugin(mongooseAggregatePaginate);

export const Bus = mongoose.model("Bus", busSchema)
