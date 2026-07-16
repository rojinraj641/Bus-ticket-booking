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
    },
    sourceCity: {
      type: String,
      required: true,
      trim: true,
    },
    destinationCity: {
      type: String,
      required: true,
      trim: true,
    },
    totalDistanceKm: {
      type: Number,
      required: true,
    },
    totalDurationMinutes: {
      type: Number,
      required: true,
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

// Core search pattern: "buses from City A to City B"
routeSchema.index({ sourceCity: 1, destinationCity: 1 });
routeSchema.index({ operator: 1 });

routeSchema.plugin(mongooseAggregatePaginate);

export const Route = mongoose.model("Route", routeSchema);