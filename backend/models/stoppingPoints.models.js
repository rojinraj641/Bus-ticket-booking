import mongoose from "mongoose";

const stoppingPointsSchema = new mongoose.Schema(
    {
        order: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        distanceFromStart: {
            type: Number,
            required: true
        },
        timeFromStart: {
            type: Number,
            required: true
        }
    },
    {_id: false}
)

export default stoppingPointsSchema