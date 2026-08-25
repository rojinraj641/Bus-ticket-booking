import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const seatSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true,
      index: true
    },
    seatNumber: {
      type: Number,
      required: true,
      index: true
    },
    seatType: {
      type: String,
      enum: ["Sleeper", "Seater"],
      required: true,
    },
    seatPosition: {
      type: String,
      enum: ["Upper", "Lower"],
      required: true,
    },
    deck: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },
    priceModifier: {
      // added/subtracted from Trip.basePrice, e.g. lower berth premium
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Available", "Locked", "Booked"],
      required: true,
      default: "Available",
      index: true
    },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lockExpiresAt: {
      // used by app-level job to auto-release stale locks (see note below)
      type: Date,
      default: null,
      index: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      default: null,
    },
    genderRestriction: {
      // ladies-only seat enforcement, independent of who's currently booked
      type: String,
      enum: ["Male", "Female", null],
      default: null,
    },
  },
  { timestamps: true }
);

seatSchema.index({ trip: 1, bus: 1, seatNumber: 1 });

seatSchema.plugin(mongooseAggregatePaginate);

export const Seats = mongoose.model("Seats", seatSchema);