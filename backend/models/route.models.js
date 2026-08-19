import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const stoppingPointSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    // minutes offset from route start — used to compute actual arrival times per trip
    offsetFromStartMinutes: {
      type: Number,
      required: true,
    },
    distanceFromStartKm: {
      type: Number,
      required: true,
    },
    isBoardingPoint: {
      type: Boolean,
      default: true,
    },
    isDroppingPoint: {
      type: Boolean,
      default: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const routeSchema = new mongoose.Schema(
  {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
      index: true
    },
    sourceCity: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    destinationCity: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    totalDistanceKm: {
      type: Number,
      required: true,
    },
    totalDurationMinutes: {
      type: Number,
      required: true,
    },
    operatingDays: {
      type: [String],
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      validate: {
        validator: (days) => Array.isArray(days) && days.length > 0,
        message: "A route must have at least one operating day",
      },
    },
    stoppingPoints: {
      type: [stoppingPointSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: "A route needs at least a source and destination stop",
      },
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

routeSchema.plugin(mongooseAggregatePaginate);

export const Route = mongoose.model("Route", routeSchema);
