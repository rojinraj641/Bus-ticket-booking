import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Seats are scoped to a Trip, not a Bus — the same physical bus seat
// (e.g. "12A") needs an independent availability/lock/booking state
// for every trip it's used on.
const seatSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
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

// One seatNumber must be unique within a trip
seatSchema.index({ trip: 1, seatNumber: 1 }, { unique: true });
seatSchema.index({ trip: 1, status: 1 });
seatSchema.index({ lockExpiresAt: 1 });

seatSchema.plugin(mongooseAggregatePaginate);

export const Seats = mongoose.model("Seats", seatSchema);