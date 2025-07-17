import asyncHandler from "../utils/asyncHandler.js";
import twilio from "twilio";
import { twilioData } from "../config/twilio.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { generateToken } from '../utils/jwtToken.js';

// Validators
const isValidPhone = (phone) => /^\d{10}$/.test(phone);
const isValidOtp = (otp) => /^\d{4,6}$/.test(otp);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const client = twilio(twilioData.TWILIO_ACCOUNT_SID, twilioData.TWILIO_AUTH_TOKEN);

// Send OTP for login/signup
const registerUser = asyncHandler(async (req, res) => {
    const { phone, name, email } = req.body;

    if (!phone || !isValidPhone(phone)) {
        throw new ApiError(400, "Invalid phone number");
    }

    // Check if user already exists
    const user = await User.findOne({ phone });

    if (!user) {
        if (!name || name.trim().length < 3) {
            throw new ApiError(400, "Name required for new users");
        }
        if (!email || !isValidEmail(email)) {
            throw new ApiError(400, "Valid email required for new users");
        }
    }

    try {
        const response = await client.verify.v2.services(twilioData.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({ channel: 'sms', to: `+91${phone}` });

        res.json({
            success: true,
            message: 'OTP sent successfully',
            isNewUser: !user,
            status: response.status
        });
    } catch (error) {
        throw new ApiError(500, "OTP sending failed", error.message);
    }
});

// Verify OTP and either create or login user
const verifyOtp = asyncHandler(async (req, res) => {
    const { phone, otp, name, email } = req.body;

    if (!phone || !isValidPhone(phone)) {
        throw new ApiError(400, "Invalid phone number");
    }

    if (!otp || !isValidOtp(otp)) {
        throw new ApiError(400, "Invalid OTP format");
    }

    try {
        const verification = await client.verify.v2.services(twilioData.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: `+91${phone}`, code: otp });

        if (verification.status !== 'approved') {
            throw new ApiError(400, "Invalid OTP");
        }

        let user = await User.findOne({ phone });

        if (!user) {
            if (!name || !email) {
                throw new ApiError(400, "Name and email are required to register");
            }

            user = await User.insertOne({ phone, name, email });
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: user.wasNew ? "User registered and OTP verified" : "OTP verified. Logged in",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "OTP verification failed",
            error: error.message,
        });
    }
});

export { registerUser, verifyOtp };
