import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    transactionRef: {
      // your own internal reference id
      type: String,
      unique: true,
      required: true,
    },
    gatewayTransactionId: {
      // id returned by Razorpay/Stripe/etc — needed to reconcile webhooks
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["PAYMENT", "REFUND", "WALLET_TOPUP", "WALLET_DEBIT"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["UPI", "Credit Card", "Debit Card", "Wallet", "NetBanking"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Successful", "Pending", "Failed", "Refunded"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ booking: 1 });
transactionSchema.index({ transactionRef: 1 }, { unique: true });
transactionSchema.index({ gatewayTransactionId: 1 });

transactionSchema.plugin(mongooseAggregatePaginate);

export const Transaction = mongoose.model("Transaction", transactionSchema);