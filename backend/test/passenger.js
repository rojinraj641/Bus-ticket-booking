import { Passenger } from "../models/passenger.models.js";
import { User } from "../models/user.models.js";
 
async function addPassenger(){
    try{
        await Passenger.deleteMany({})
    }
    catch(error){
        console.log(error.message);
    }
}

export default addPassenger