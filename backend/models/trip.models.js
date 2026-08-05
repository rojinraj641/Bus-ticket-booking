import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tripSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
      index: true
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
      index: true
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
      index: true
    },
    departureDate: {
      // calendar date of the trip start (midnight UTC), used for date-range search
      type: Date,
      required: true,
      index: true
    },
    departureDateTime: {
      type: Date,
      required: true,
      index: true
    },
    arrivalDateTime: {
      type: Date,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    availableSeatsCount: {
      // denormalized counter, updated on lock/book/release/cancel for fast list views
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "DEPARTED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
      index: true
    },
  },
  { timestamps: true }
);
              

tripSchema.plugin(mongooseAggregatePaginate);

export const Trip = mongoose.model("Trip", tripSchema);
