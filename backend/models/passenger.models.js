import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const passengerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            min: 0
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male","Female","Other"]
        },
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true
        }
    },{timestamps: true}
)

passengerSchema.plugin(mongooseAggregatePaginate);
export const Passenger = mongoose.model("Passenger",passengerSchema);