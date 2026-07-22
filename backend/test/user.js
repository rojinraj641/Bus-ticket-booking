import { User } from "../models/user.models.js";
//Adding dummy User
async function addUser(count = 100) {
    try {
        console.log("No user data added");
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addUser
