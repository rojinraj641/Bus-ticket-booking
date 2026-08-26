import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
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
        throw new ApiError(
            404,
            "User not found. Please signup"
        );
    }

    // Compare entered password with stored hash
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            userId: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            userId: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );

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

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: userObj,
                accessToken,
            },
            "User logged in successfully"
        )
    );
});

export default login;