import { Seats } from "../models/seats.models.js";
import { Bus } from "../models/bus.models.js";

async function addSeats() {
    try {
       console.log("No seats data added");

    } catch (error) {
        console.error('Error adding seats:', error.message);
    }
}

export default addSeats;
