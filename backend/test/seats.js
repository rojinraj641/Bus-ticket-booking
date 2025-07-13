import { Seats } from "../models/seats.models.js";
import { Bus } from "../models/bus.models.js";

async function addSeats() {
    try {
        const seatData = [];
        const bus = await Bus.findOne({ busName: 'JSR Roadlinks' }, '_id');
        const array = ['A','B','C','D']
        // Lower seats L1 to L15
        for (let i = 0; i < 3; i++) {
            for(let j=1;j<=4;j++){
                seatData.push({
                busId: bus._id,
                seatNumber: `L${array[i]}${j}`,
                seatType: 'Seater',
                seatPosition: 'Lower',
                basePrice: 800,
                isBooked: false,
                bookedBy: null
            });
            }
        }

        // Upper seats U1 to U15
        for (let i = 0; i < 3; i++) {
            for( let j=1; j<=4; j++){
                seatData.push({
                busId: bus._id,
                seatNumber: `U${array[i]}${j}`,
                seatType: 'Sleeper',
                seatPosition: 'Upper',
                basePrice: 1000,
                isBooked: false,
                bookedBy: null
            });
            }
        }
        
        //Saving all seats to DB
        // await Seats.insertMany(seatData);
        // console.log(`${seatData.length} seats added successfully for bus`);

    } catch (error) {
        console.error('Error adding seats:', error.message);
    }
}

export default addSeats;
