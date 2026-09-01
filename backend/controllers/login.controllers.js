import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            throw new ApiError(
                400,
                "Email and password are required"
            );
        }

        // Find user by email
        const user = await User.findOne({ email }).select("+passwordHash");

        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Compare entered password with stored hash
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isPasswordCorrect) {
            return res.status(401).json(new ApiResponse(401, "Invalid email or password"));
        }

        // Generate access token
        const accessToken = generateAccessToken(user._id);

        // Generate refresh token
        const refreshToken = generateRefreshToken(user._id);

        // Store refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Remove password before sending user
        const userObj = user.toObject();
        delete userObj.passwordHash;

        return res.status(200).json(new ApiResponse(200, { user: userObj, accessToken }, "User logged in successfully"));
    }
    catch (error) {
        console.log('Login error', error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Down"));
    }
});

export default login;