import { Bus } from "../models/bus.models.js";

//Adding New Bus
async function addBus() {
    try {
        // await Bus.insertOne({
        // busName: 'JSR Roadlinks',
        // day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // boardingTime: '11:00',
        // ratings: 4.5,
        // averageSpeed: 40,
        // busType: 'Seater',
        // isACAvailable: true,
        // stoppingPoints: ['Kottarakkara','Kizhakketheruvu','Chengamanadu','Kunnicode','Punalur'],
        // amenities: ['WiFi', 'Charging Point', 'Reading Light', 'Blanket', 'Water Bottle'],
        // totalSeats: 50,
        // totalDeck: 1,
        // totalTravelTime: 60,
        // })
        // console.log('New Bus Saved');
    }
    catch (error) {
        console.log('Failed to add bus');
    }
}

export default addBus
