import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const busSchema = new mongoose.Schema(
  {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
      required: true,
      index: true
    },

    busName: {
      type: String,
      required: true,
      trim: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },

    busType: {
      type: [String],
      enum: ["AC", "Non AC", "Sleeper", "Seater", "Semi Sleeper"],
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    totalDeck: {
      type: Number,
      default: 1,
      enum: [1, 2],
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "MAINTENANCE"],
      default: "ACTIVE",
      index: true
    },
  },
  { timestamps: true }
);

busSchema.plugin(mongooseAggregatePaginate);

export const Bus = mongoose.model("Bus", busSchema);
