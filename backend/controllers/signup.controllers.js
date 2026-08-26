import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(
            400,
            "Name, email, and password are required"
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists. Please login"
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        passwordHash: hashedPassword,
    });

    // Remove password from response
    const userObj = user.toObject();
    delete userObj.passwordHash;

    // Generate access token
    const accessToken = jwt.sign(
        {
            userId: userObj._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            userId: userObj._id,
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

    // Send access token + user to frontend
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user: userObj,
                accessToken,
            },
            "User registered successfully"
        )
    );
});

export default signup;