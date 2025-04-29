import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new mongoose.Schema(
    {
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
            enum: ["UPI","NetBanking"]
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ["Successful","Pending","Failed"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },{timestamps: true}
)
transactionSchema.plugin(mongooseAggregatePaginate);

export const Transaction = mongoose.model("Transaction", transactionSchema);