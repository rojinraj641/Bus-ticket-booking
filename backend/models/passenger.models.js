import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Passengers are lightweight, reusable "traveler profiles" tied to the
// booking user (e.g. saved family members), not one-per-booking.
const passengerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    },
    idProofType: {
      type: String,
      enum: ["Aadhaar", "PAN", "Passport", "DrivingLicense", null],
      default: null,
    },
    idProofNumber: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

passengerSchema.index({ user: 1 });

passengerSchema.plugin(mongooseAggregatePaginate);
export const Passenger = mongoose.model("Passenger", passengerSchema);