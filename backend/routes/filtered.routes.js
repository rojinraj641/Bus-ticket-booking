import express from "express";
import { filteredResult } from "../controllers/filtered.controllers.js";
import auth from "../middlewares/auth.middleware.js";
import locked from "../controllers/lockSeat.controllers.js";
import fetchSeats from "../controllers/fetchSeat.controllers.js";

const router = express.Router();
router.post("/",auth, filteredResult);
router.post("/fetchSeats", auth, fetchSeats);
router.post("/lockSeats", auth, locked);

export default router;