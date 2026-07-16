import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Wallet ledger entries live in Transaction (type: WALLET_TOPUP/WALLET_DEBIT),
// queryable via Transaction.find({ user, type: /WALLET/ }). A wallet doc
// only needs to track its live balance, not embed history.
const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

walletSchema.index({ user: 1 }, { unique: true });

walletSchema.plugin(mongooseAggregatePaginate);

export const Wallet = mongoose.model("Wallet", walletSchema);