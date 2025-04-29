import asyncHandler from "../utils/asyncHandler.js";
import twilio from "twilio";
import { twilioData } from "../config/twilio.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.models.js";

// Helper function for phone number validation
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

// Helper function for OTP validation
const isValidOtp = (otp) => /^\d{4,6}$/.test(otp);

const client = twilio(twilioData.TWILIO_ACCOUNT_SID, twilioData.TWILIO_AUTH_TOKEN);


const registerUser = asyncHandler(async (req, res) => {
    const { phone } = req.body;
    if (!phone || !isValidPhone(phone)) {
        throw new ApiError(404, "Invalid phone number");
    }
    try {
        const response = await client.verify.v2.services(twilioData.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({ channel: 'sms', to: `+91${phone}` });

        res.json({ success: true, message: 'OTP sent successfully', status: response.status });
    } catch (error) {
        throw new ApiError(500, "Otp sending failed", error.message);
    }
})

const verifyOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !isValidPhone(phone)) {
        throw new ApiError(400, "Invalid phone number");
    }

    if (!otp || !isValidOtp(otp)) {
        throw new ApiError(400, "Invalid OTP format");
    }

    try {
        const response = await client.verify.v2.services(twilioData.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: `+91${phone}`, code: otp });

        if (response.status === 'approved') {
            let existingUser = await User.findOne({phone});
            if(existingUser){
                res.json({
                    success: true,
                    message: "Otp verified successfully",
                    user: existingUser
                })
            }
            else{
                newUser = await User.create({phone});
                res.json({
                    success: true,
                    message: "User created and Otp verified",
                    user: newUser
                })
            }
        } else {
            throw new ApiError(400, "Invalid Otp")
        }
    } catch (error) {
        console.log("Otp verification failed",error.message);
        res.status(500).json({
            success: false,
            message: "Otp verification failed",
            error: error.message
        })
    }
})

export { registerUser, verifyOtp };

