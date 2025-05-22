import { User } from "../models/user.models.js";

//Adding dummy User
async function addUser() {
    try {
        const newUser = new User({
            userId: 'user001',
            phone: '8943939053',
            email: 'rojinraj69@gmail.com',
            referral: 'ROJ123',
            isActive: true
        })
        const existingUser = User.findOne({newUser});
        if (existingUser) {
            console.log('User already exists')  
        }
        else{
            await newUser.save();
            console.log('User added successfully');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addUser
