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
    departureTime: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
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
      enum: ["SCHEDULED", "BOARDING", "DEPARTED", "DELAYED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
      index: true
    },
    tripCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
      index: true
    },
  },
  { timestamps: true }
);


tripSchema.plugin(mongooseAggregatePaginate);

export const Trip = mongoose.model("Trip", tripSchema);
