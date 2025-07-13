import express from "express";
import { passengerDetails } from '../controllers/passengerDetails.controllers.js'

const router = express.Router();
router.route('/').post(passengerDetails)

export default router;