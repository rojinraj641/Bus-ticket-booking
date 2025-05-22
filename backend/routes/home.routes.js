import express from "express";
import { homeData } from "../controllers/home.controllers.js";

const router = express.Router();
router.get("/",homeData)

export default router;