import express from "express";
import filteredResult from "../controllers/filtered.controllers.js";
import getRouteSuggestions from "../controllers/getRouteSuggestions.controllers.js";
import locked from "../controllers/lockSeat.controllers.js";
import fetchSeats from "../controllers/fetchSeat.controllers.js";

const router = express.Router();
router.get("/suggestions", getRouteSuggestions);
router.get("/", filteredResult);
router.get("/fetchSeats", fetchSeats);
router.post("/lockSeats", locked);

export default router;