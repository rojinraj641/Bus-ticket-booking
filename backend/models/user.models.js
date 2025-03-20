import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        phoneNumber: {type: Number, required: true},
        age: {type: Number, required: true},
        gender: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        state: {type: String},
        referralCode: {type: String}
    }
);

export const User = mongoose.model("User", userSchema);

// // User Schema
// const userSchema = new Schema({
//     name: { type: String, required: true },
//     phoneNumber: { type: Number, required: true, index: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     state: { type: String, required: true },
//     email: { type: String, required: true, unique: true, index: true },
//     referralCode: {type: String, required: true, unique: true}
// });

// // Bus Schema
// const busSchema = new Schema({
//     name: { type: String, required: true, index: true },
//     busType: { type: String, required: true },
//     arrivalTime: { type: Date, required: true },
//     departureTime: { type: Date, required: true },
//     rating: { type: Number, required: true },
//     fare: { type: Number, required: true }
// });

// // Coupon Schema
// const couponSchema = new Schema({
//     couponCode: { type: String, required: true, unique: true, index: true },
//     discountType: { type: String, required: true },
//     discountAmount: { type: Number },
//     couponDescription: { type: String, required: true },
//     startDate: { type: Date, required: true, index: true },
//     endDate: { type: Date, required: true, index: true },
//     couponQuantity: { type: Number, required: true },
//     couponStatus: { type: String, required: true }
// });

// // Wallet Schema
// const walletSchema = new Schema({
//     availableBalance: { type: Number, required: true },
//     userDetails: { type: ObjectId, ref: 'User', index: true }
// });

// // Booking Schema
// const bookingSchema = new Schema({
//     boardingPoint: { type: String, required: true },
//     destination: { type: String, required: true },
//     boardingTime: { type: Date, required: true },
//     arrivalTime: { type: Date, required: true },
//     pnrNumber: { type: Number, required: true, unique: true, index: true },
//     busDetails: { type: ObjectId, ref: 'Bus', required: true, index: true },
//     userDetails: { type: ObjectId, ref: 'User', required: true, index: true },
// });

// // Transaction Schema
// const transactionSchema = new Schema({
//     transactionId: { type: String, required: true, unique: true, index: true },
//     transactionAmount: { type: Number, required: true },
//     transactionMethod: { type: String, required: true },
//     transactionDate: { type: Date, required: true, index: true },
//     transactionStatus: { type: String, required: true }
// });

// // Export models
// const User = mongoose.model('User', userSchema);
// const Bus = mongoose.model('Bus', busSchema);
// const Coupon = mongoose.model('Coupon', couponSchema);
// const Wallet = mongoose.model('Wallet', walletSchema);
// const Booking = mongoose.model('Booking', bookingSchema);
// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = { User, Bus, Coupon, Wallet, Booking, Transaction };
