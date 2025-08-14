import express from "express";
import { filteredResult } from "../controllers/filtered.controllers.js";
import locked from "../controllers/lockSeat.controllers.js";
import fetchSeats from "../controllers/fetchSeat.controllers.js";

const router = express.Router();
router.route("/").get(filteredResult);
router.route('/fetchSeats').get(fetchSeats);
router.route("/lockSeats").post(locked);

export default router;