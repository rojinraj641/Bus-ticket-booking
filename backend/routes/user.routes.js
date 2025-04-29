import express from "express";
import {registerUser,verifyOtp} from "../controllers/user.controllers.js";

const router = express.Router();
router.route("/register").post(registerUser)
router.route("/verifyOTP").post(verifyOtp)

export default router;