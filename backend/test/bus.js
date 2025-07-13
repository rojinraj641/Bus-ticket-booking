import { Bus } from "../models/bus.models.js";

//Adding New Bus
async function addBus() {
    try {
        // await Bus.insertOne({
        // busName: 'JSR Roadlinks',
        // day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // boardingTime: '11:00',
        // ratings: 4.5,
        // busType: 'AC',
        // stoppingPoints: ['Kottarakkara','Kizhakketheruvu','Chengamanadu','Kunnicode','Punalur'],
        // amenities: ['WiFi', 'Charging Point', 'Reading Light', 'Blanket', 'Water Bottle'],
        // totalSeats: 24,
        // totalDeck: 2,
        // totalTravelTime: 1,
        // totalDistance: 18,
        // rowsPerDeck: 3,
        // seatsPerRow: 4,
        // })
        // console.log('New Bus Saved');
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addBus
