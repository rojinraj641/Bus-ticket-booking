import { Bus } from "../models/bus.models.js";

//Adding New Bus
async function addBus() {
    try {
        const newBusData = {
            busId: 'bus001',
            busName: 'JSR Roadlinks',
            ratings: 4.3,
            busType: 'AC',
            amenities: ['Wifi', 'WaterBottle']
        };
        const existingBus = await Bus.findOne({ busId: newBusData.busId });
        if (existingBus) {
            console.log('Bus already existed');
        }
        else {
            const newBus = new Bus(newBusData);
            await newBus.save();
            console.log('New Bus added');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addBus
