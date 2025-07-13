import express from "express";
import { filteredResult } from "../controllers/filtered.controllers.js";

const router = express.Router();
router.route("/").get(filteredResult)

export default router;