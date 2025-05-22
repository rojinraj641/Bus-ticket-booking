import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const pointsSchema = new mongoose.Schema(
    {
        busId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus"
        },
        stoppingPoints: [
            {
                name: {type: String,required: true},
                arrival: {type: Date, required: true},
                timeToNext: {type: Number,required: true,default: 0}
            }
        ]    
    },{timestamps: true}
)

pointsSchema.plugin(mongooseAggregatePaginate);

export const points = mongoose.model("points", pointsSchema)