import { Booking } from "../models/booking.models.js";
import { Bus } from "../models/bus.models.js";
import { Passenger } from "../models/passenger.models.js";
import { User } from "../models/user.models.js";
import { Transaction } from "../models/transaction.models.js";

async function addBooking() {
  try {
    const user = await User.findOne({ phone: '8943939053' }).select('_id');
    if (!user) throw new Error("User not found");

    const bus = await Bus.findOne({ busName: 'JSR Roadlinks' }).select('_id');
    if (!bus) throw new Error("Bus not found");

    const passengers = await Passenger.find({ userId: user._id }).select('_id');
    if (!passengers.length) throw new Error("No passengers found");

    const transaction = await Transaction.findOne({ userId: user._id }).select('_id');
    if (!transaction) throw new Error("Transaction not found");

    const data = {
      busId: bus._id,
      userId: user._id,
      transactionId: transaction._id,
      passengerId: passengers.map(p => p._id),
      bookingDate: new Date(),
      departurePoint: 'Kottarakkara',
      departureTime: '11:00',
      destinationPoint: 'Punalur',
      arrivingTime: '12:00',
      bookingStatus: 'Confirmed',
      totalAmount: 870,
    };

    // const newBooking = await Booking.create(data);
    console.log("✅ Booking Created:", newBooking);
  } catch (error) {
    console.error("❌ Booking Failed:", error.message);
  }
}

export default addBooking;
