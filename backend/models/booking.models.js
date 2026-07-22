import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seats",
        required: true,
      },
    ],
    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
        required: true,
      },
    ],
    pnr: {
      // human-facing booking reference, e.g. "RB4X9K2"
      type: String,
      required: true,
      unique: true,
      index: true
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // snapshot fields — copied at booking time so a later Route/stop edit
    // never changes a ticket that's already been issued
    boardingPointCity: {
      type: String,
      required: true,
    },
    boardingDateTime: {
      type: Date,
      required: true,
    },
    droppingPointCity: {
      type: String,
      required: true,
    },
    droppingDateTime: {
      type: Date,
      required: true,
    },
    couponApplied: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      enum: ["Confirmed", "In Progress", "Cancelled", "Completed"],
      default: "In Progress",
      index: true
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(mongooseAggregatePaginate);

export const Booking = mongoose.model("Booking", bookingSchema);