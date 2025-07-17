import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Passenger } from "../models/passenger.models.js";
import { User } from "../models/user.models.js"

const passengerDetails = asyncHandler(async (req,res)=>{
    try{
    // const {passengers, email, phone} = req.body;
    // const user = await User.findOne({$and: {phone,email}}).select(_id);
    // if(!user){
    //     throw new ApiError(404, 'User not found')
    // }
    // const passengerWithUserId = passengers.map((p)=>({
    //     ...p,
    //     userId: user._id
    // }))

    // const res = await Passenger.insertMany(passengerWithUserId)
    // return res.status(200).json(new ApiResponse(200,'All passengers inserted'))
    console.log('Passenger management')
    }
    catch(error){
        throw new ApiError(404,'Something went wrong')
    }
})

export { passengerDetails }