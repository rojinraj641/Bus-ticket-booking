import { Passenger } from "../models/passenger.models.js";
import mongoose from "mongoose";

async function addPassenger() {
  try {
    const passengers = [
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000011"),
        name: "Vikram Singh",
        age: 29,
        gender: "Male",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000012"),
        name: "Ananya Gupta",
        age: 26,
        gender: "Female",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000013"),
        name: "Karthik Raman",
        age: 33,
        gender: "Male",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000014"),
        name: "Divya Menon",
        age: 31,
        gender: "Female",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000015"),
        name: "Priya Singh",
        age: 27,
        gender: "Female",
      },
    ];
    if(await Passenger.countDocuments() <= 10){
        const response = await Passenger.insertMany(passengers);  
        if(response){
            console.log('Passengers added successfully');
        }
    }else{
        console.log("Passengers already exist. Skipping insertion");
        return;
    }
  } catch (error) {
    console.log("Error inserting passenger:", error.message);
  }
}

export default addPassenger;
