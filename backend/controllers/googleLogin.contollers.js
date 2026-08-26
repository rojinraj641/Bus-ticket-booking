import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const googleLogin = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json(new ApiError(400, "Google OAuth token missing"));
    }

    // 1. Verify Google credential
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // 2. Get Google user's information
    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
    } = payload;

    // 3. Find existing user
    let user = await User.findOne({
      email,
    });

    // 4. If user doesn't exist, create one
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
      });
    }

    // 5. Create YOUR application's access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    // 6. Create YOUR application's refresh token
    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    // 7. Store refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 8. Send access token to React
    return res.status(200).json(new ApiResponse(200, {token: accessToken, user}, "Google login successful"))

  } catch (error) {
    console.error("Google authentication error:", error);
    return res.status(401).json(new ApiError(401, "Invalid Google credential"));
  }
});

export default googleLogin