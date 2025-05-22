import {Transaction} from "../models/transaction.models.js";

async function addTransaction(){
    try{
        const newTransaction = new Transaction({
        transactionId: 'PAY001',
        date: Date.now(),
        amount: 1000,
        paymentMethod: "UPI",
        paymentStatus: 'Successful'
    })
        await newTransaction.save();
        console.log('Transaction saved successfully');
    }
    catch(error){
        console.log(error.message);
    }
}

export default addTransaction