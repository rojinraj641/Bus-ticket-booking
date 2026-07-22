import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    availableBalance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  { timestamps: true }
);

walletSchema.plugin(mongooseAggregatePaginate);

export const Wallet = mongoose.model("Wallet", walletSchema);