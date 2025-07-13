import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const seatSchema = new mongoose.Schema(
    {
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus"
        },
        seatNumber:{
            type: String,
            required: true
        },
        seatType:{
            type: String,
            enum: ['Sleeper','Seater']
        },
        seatPosition: {
            type: String,
            enum: ['Upper','Lower']
        },
        basePrice: {
            type: Number,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false,
            required: true
        },
        bookedBy: {
            type: String,
            enum: ['Male','Female',null],
        }
    },{timestamps: true}
)

seatSchema.plugin(mongooseAggregatePaginate);

export const Seats = mongoose.model("Seats",seatSchema);