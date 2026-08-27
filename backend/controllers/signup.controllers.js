import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

const signup = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json(new ApiResponse(400, "Name, email and password required"));
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json(new ApiResponse(409, "User already existed"));
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            passwordHash: hashedPassword,
        });
        console.log('User created', user);
        // Remove password from response
        const userObj = user.toObject();
        delete userObj.passwordHash;

        // Generate access token
        const accessToken = generateAccessToken(user._id);
        console.log('Access token is', accessToken);

        // Generate refresh token
        const refreshToken = generateRefreshToken(user._id);
        console.log('Refresh token is', refreshToken);

        // Store refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send access token + user to frontend
        return res.status(201).json(new ApiResponse(201,{user: userObj,accessToken},"User registered successfully")
        );
    }
    catch(error){
        console.error("Signup error:", error);
        return res.status(500).json(new ApiError(500, "Internal server error"));
    }
});

export default signup;