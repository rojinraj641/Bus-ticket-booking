import { Seats } from "../models/seats.models.js";
import { Bus } from "../models/bus.models.js";

async function addSeats() {
    try {
        // const seatData = [];
        // const bus = await Bus.findOne({ busName: 'JSR Roadlinks' }, '_id');
        // // Lower seats L1 to L15
        // for(let i=1;i<=50;i++){
        //     seatData.push({
        //         busId: bus._id,
        //         seatNumber: i,
        //         seatType: 'Seater',
        //         seatPosition: 'Lower',
        //         basePrice: 800,
        //         status: 'Available',
        //         bookedBy: null,
        //         timeToLock: null
        //     })
        // }

        // await Seats.insertMany(seatData);
        // console.log(`${seatData.length} seats added successfully for bus`);

    } catch (error) {
        console.error('Error adding seats:', error.message);
    }
}

export default addSeats;
