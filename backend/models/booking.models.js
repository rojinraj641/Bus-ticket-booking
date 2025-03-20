import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {type: String, unique: true, required: true},
        transactionId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Transaction"
        },
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        busId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Bus"
        }
    
},{timestamps: true});

export const Booking = mongoose.model("Booking",bookingSchema);