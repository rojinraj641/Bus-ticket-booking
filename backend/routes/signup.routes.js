import express from "express";
import signup from "../controllers/signup.controllers.js";

const router = express.Router();
router.post("/signup", signup);

export default router;