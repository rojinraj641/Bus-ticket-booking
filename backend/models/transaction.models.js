import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {type: String, unique: true, required: true},
        paymentMethod: {type: String, required: true},
        amount: {type: Number, required: true},
        paymentStatus: {type: String, required: true},
        paymentDate: {type: Date, required: true},
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);