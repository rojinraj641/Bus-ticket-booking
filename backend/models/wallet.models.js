import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const walletSchema = new mongoose.Schema(
    {
        availableBalance: {
            type: Number,
            required: true,
            default: 0
        },
        transactionDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
    }, { timestamps: true });

walletSchema.plugin(mongooseAggregatePaginate);

export const Wallet = mongoose.model("Wallet", walletSchema);