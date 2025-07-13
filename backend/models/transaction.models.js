import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        transactionId: {
            type: String,
            unique: true,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["UPI","Credit Card","Debit Card","Wallet"]
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ["Successful","Pending","Failed"]
        },
    },{timestamps: true}
)
transactionSchema.plugin(mongooseAggregatePaginate);

export const Transaction = mongoose.model("Transaction", transactionSchema);