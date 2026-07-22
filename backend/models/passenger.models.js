import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const passengerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    }
  },
  { timestamps: true }
);

passengerSchema.plugin(mongooseAggregatePaginate);
export const Passenger = mongoose.model("Passenger", passengerSchema);