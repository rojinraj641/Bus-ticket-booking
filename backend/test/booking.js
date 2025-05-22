import { Booking } from "../models/booking.models.js";
import { Bus } from "../models/bus.models.js";
import { Transaction } from "../models/transaction.models.js";
import { Passenger } from "../models/passenger.models.js";

async function addBooking() {

    try {
        const bus = await Bus.findOne({ busId: 'bus001' });
        const transaction = await Transaction.findOne({ transactionId: 'PAY001' });
        const passenger = await Passenger.findOne({ passengerId: 'PASS001' });

        if(!bus || !transaction || !passenger){
            console.log('Data not found')
        }
        
        const newBooking = new Booking({
            bookingId: 'TKT001',
            busId: bus._id,
            transactionId: transaction._id,
            passengerId: [passenger._id],
            bookingDate: Date.now(),
            departure: {
                boardingPoint: 'Kochi',
                time: new Date("2025-05-20T21:30:00")
            },
            arrival: {
                destination: 'Coimbatore',
                time: new Date("2025-05-20T05:00:00")
            },
            bookingStatus: 'Confirmed',
            totalAmount: 1100
        })

        await newBooking.save();
        console.log('New booking added')
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addBooking