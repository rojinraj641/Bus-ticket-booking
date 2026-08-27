import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

export default generateAccessToken;