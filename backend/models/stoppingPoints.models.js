import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const stoppingPointsSchema = new mongoose.Schema(
    {
        busId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus"
        },
        stops: [
            {
                name: {type: String,required: true},
                arrival: {type: Date, required: true},
                timeToNext: {type: Number,required: true,default: 0}
            }
        ]    
    },{timestamps: true}
)

stoppingPointsSchema.plugin(mongooseAggregatePaginate);

export const StoppingPoint = mongoose.model("StoppingPoint", stoppingPointsSchema)