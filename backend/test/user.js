import { User } from "../models/user.models.js";
//Adding dummy User
async function addUser(count = 100) {
    try {
        const data = {
            phone: '8943939053',
            email: 'rojinraj96@gmail.com',
            referral: 'ROJ100',
            isActive: true
        }
        // await User.insertOne(data);
        console.log('User created successfully')
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addUser
