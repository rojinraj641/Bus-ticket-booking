import { Passenger } from "../models/passenger.models.js";
import mongoose from "mongoose";

async function addPassenger() {
  try {
    const passengers = [
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000001"),
        name: "Rahul Sharma",
        age: 28,
        gender: "Male",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000002"),
        name: "Priya Nair",
        age: 24,
        gender: "Female",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000003"),
        name: "Arjun Reddy",
        age: 35,
        gender: "Male",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000004"),
        name: "Sneha Patel",
        age: 31,
        gender: "Female",
      },
      {
        user: new mongoose.Types.ObjectId("687c00000000000000000005"),
        name: "Alex Morgan",
        age: 27,
        gender: "Other",
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
