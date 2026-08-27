import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json(new ApiResponse(200, 'User logged out successfully'))
    }
    catch (error) {
        throw new ApiError(401, 'User logout failed')
    }
})

export default logout