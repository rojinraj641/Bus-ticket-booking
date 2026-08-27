import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import generateAccessToken from "../utils/generateAccessToken.js";

const refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;
    // Check if refresh token exists
    if (!token) {
        return res
            .status(401)
            .json(new ApiError(401, "Refresh token not found"));
    }
    try {
        // Verify refresh token
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );
        // Find user
        const user = await User.findById(decoded.userId)
            .select("-passwordHash");
        if (!user) {
            return res
                .status(401)
                .json(new ApiError(401, "User not found"));
        }
        // Generate new access token
        const accessToken = generateAccessToken(user._id);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: user.name,
                        accessToken
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        console.error("Refresh token error:", error);
        return res
            .status(401)
            .json(new ApiError(401, "Invalid or expired refresh token"));
    }
});

export default refreshToken;