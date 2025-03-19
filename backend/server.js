
const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

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
