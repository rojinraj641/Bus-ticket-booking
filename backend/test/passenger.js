import { Passenger } from "../models/passenger.models.js";
import { User } from "../models/user.models.js";

async function addPassenger() {
  try {
    const user = await User.findOne({ phone: "8943939053" }).select("_id");
    if (!user) {
      console.log("User not found");
      return;
    }

    const data = {
      userId: user._id,
      name: "Rojin Raj",
      age: 23,
      gender: "Male",
      place: "Kerala",
    };

    // const res = await Passenger.insertOne(data);

    if (!res) {
      console.log("Passenger insertion failed");
    } else {
      console.log("Passenger inserted successfully");
    }
  } catch (error) {
    console.log("Error inserting passenger:", error.message);
  }
}

export default addPassenger;
