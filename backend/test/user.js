import { User } from "../models/user.models.js";
import { faker } from '@faker-js/faker';

function generateUsers() {
    return {
        phone: faker.phone.number({style: 'national'}),
        email: faker.internet.email(),
        referral: faker.string.alphanumeric({ length: 6 }),
        isActive: true
    }
}
//Adding dummy User
async function addUser(count = 100) {
    try {
        let users = [];
        for (let i = 0; i < count; i++) {
            const fakeUser = generateUsers();
            users.push(fakeUser);
        }
        const totalUsers = await User.countDocuments();
        if (totalUsers < count) {
            await User.insertMany(users);
            console.log(`${count} User added successfully`);
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addUser
