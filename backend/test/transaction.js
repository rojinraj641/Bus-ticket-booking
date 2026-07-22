import { Transaction } from "../models/transaction.models.js";
import { User } from "../models/user.models.js";

async function addTransaction() {
  try {
   console.log("No transaction data added");
  } catch (error) {
    console.error('Failed to add transaction:', error.message);
  }
}

export default addTransaction;
