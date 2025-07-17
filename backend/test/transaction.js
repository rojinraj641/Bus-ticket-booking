import { Transaction } from "../models/transaction.models.js";
import { User } from "../models/user.models.js";

async function addTransaction() {
  try {
    const user = await User.findOne({ phone: '8943939053' }).select('_id');
    if (!user) {
      console.log('User not found');
      return;
    }

    const data = {
      userId: user._id,
      transactionId: 'TRANS001',
      date: new Date(),
      amount: 870,
      paymentMethod: 'UPI',
      paymentStatus: 'Successful'
    };

    // const result = await Transaction.create(data);
    console.log('Transaction added successfully:', result);
  } catch (error) {
    console.error('Failed to add transaction:', error.message);
  }
}

export default addTransaction;
