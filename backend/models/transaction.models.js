import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
      index: true
    },
    transactionRef: {
      // your own internal reference id
      type: String,
      unique: true,
      required: true,
      index: true
    },
    gatewayTransactionId: {
      // id returned by Razorpay/Stripe/etc — needed to reconcile webhooks
      type: String,
      default: null,
      index: true
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

transactionSchema.plugin(mongooseAggregatePaginate);

export const Transaction = mongoose.model("Transaction", transactionSchema);