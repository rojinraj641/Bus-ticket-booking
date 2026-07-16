import express from "express";
import lockSeats from "../controllers/lockSeat.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post('/',auth, lockSeats);

export default router;