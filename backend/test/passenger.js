import { Passenger } from "../models/passenger.models.js";

async function addPassenger(){
    try{
        const newPassenger = new Passenger({
            passengerId: 'PASS001',
            fullName: 'Rojin Raj',
            age: 23,
            gender: 'Male',
            state: 'Kerala',
            bookedSeat: 'L1'
        })
        await newPassenger.save();
        console.log('Passenger added successfully');
    }
    catch(error){
        console.log(error.message);
    }
}

export default addPassenger