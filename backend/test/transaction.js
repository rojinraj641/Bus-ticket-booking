import {Transaction} from "../models/transaction.models.js";
import { User } from "../models/user.models.js";
import { faker } from "@faker-js/faker";

function generateFakeTransaction(userIds){
    return{
        userId: userIds,
        transactionId: faker.string.uuid(),
        date: Date.now(),
        amount: 1500,
        paymentMethod: "UPI",
        paymentStatus: "Successful"
    }
}
async function addTransaction(){
    try{
       let user = await User.find().select('_id').limit(1);
       let userIds = user.map(user => user._id)
       let transaction = generateFakeTransaction(userIds);
       await Transaction.create(transaction);
       console.log('Transaction added successfully');
    }
    catch(error){
        console.log(error.message);
    }
}

export default addTransaction