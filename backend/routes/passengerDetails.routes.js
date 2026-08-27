import express from "express";
import { passengerDetails } from '../controllers/passengerDetails.controllers.js'
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route('/').post(auth, passengerDetails)

export default router;