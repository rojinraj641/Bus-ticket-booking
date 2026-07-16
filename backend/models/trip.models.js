import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// A Trip is one scheduled departure: a specific Bus running a specific Route
// on a specific date/time. This is what users actually search and book.
const tripSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
    },
    departureDate: {
      // calendar date of the trip start (midnight UTC), used for date-range search
      type: Date,
      required: true,
    },
    departureDateTime: {
      type: Date,
      required: true,
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
    },
  },
  { timestamps: true }
);

// Core search pattern: find trips on a route for a given date
tripSchema.index({ route: 1, departureDate: 1 });
tripSchema.index({ bus: 1, departureDateTime: 1 });
tripSchema.index({ operator: 1, departureDate: 1 });
tripSchema.index({ status: 1 });

tripSchema.plugin(mongooseAggregatePaginate);

export const Trip = mongoose.model("Trip", tripSchema);