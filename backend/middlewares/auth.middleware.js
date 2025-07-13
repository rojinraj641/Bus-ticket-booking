import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
import ApiError from '../utils/ApiError.js';;
import asyncHandler from '../utils/asyncHandler.js';

const auth = asyncHandler(async(req, res, next)=>{
    const authHeader = req.header.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new ApiError(401, 'Unauthorized, no token provided');
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            throw new ApiError(404, 'Authorized User not found');
        }
        req.user = user;
        next();
    }
    catch(error){
        throw new ApiError(401, 'Invalid or unauthorized token');
    }
})

export default auth;