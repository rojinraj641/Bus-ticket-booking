import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db';

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(cors());          // Enable CORS


app.get("/api/signup", (req, res) => {
    const {phoneNumber,referralCode}=req.body;
    console.log(phoneNumber);
    console.log(referralCode);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
