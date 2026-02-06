import { Bus } from "../models/bus.models.js";

//Adding New Bus
async function addBus() {
    try {
        // await Bus.insertOne({
        // busName: 'JSR Roadlinks',
        // day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // tripStartingTime: 660,
        // tripEndingTime: 705,
        // ratings: 4.5,
        // averageSpeed: 40,
        // busType: 'Seater',
        // isACAvailable: true,
        // stoppingPoints: [
        // {'city': 'Kottarakkara', 'order': 0, 'distanceFromStart': 0, 'timeFromStart': 0},
        // {'city': 'Chengamanadu', 'order': 1,  'distanceFromStart': 5, 'timeFromStart': 15},
        // {'city': 'Kunnicodu', 'order': 2, 'distanceFromStart': 10, 'timeFromStart': 30},
        // {'city': 'Punalur', 'order': 3, 'distanceFromStart': 20, 'timeFromStart': 45 }
        // ],
        // totalSeats: 50,
        // totalDeck: 1,
        // totalTravelTime: 45,
        // amenities: ['WiFi', 'Charging Point', 'Reading Light', 'Blanket', 'Water Bottle'],
        // })
        // console.log('New Bus Saved');
    }
    catch (error) {
        console.log('Failed to add bus');
    }
}

export default addBus
