import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const busSchema = new mongoose.Schema(
    {
        busId: {
            type: String,
            unique: true,
            required: true
        },
        busName: {
            type: String,
            required: true
        },
        stoppingPoints: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoppingPoint"
        }],
        seats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seats"
        }],
        ratings: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
            required: true
        },
        busType:{
            type: String,
            enum: ['AC','Non AC']
        },
        amentities: {
            type: [String],
            required: true
        }
    }, { timestamps: true });

busSchema.plugin(mongooseAggregatePaginate);

export const Bus = mongoose.model("Bus", busSchema)