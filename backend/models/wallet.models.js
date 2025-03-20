import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
    {
        availableBalance: {type: Number, required: true},
        transactionId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
    },{timestamps: true});

export const Wallet = mongoose.model("Wallet",walletSchema);