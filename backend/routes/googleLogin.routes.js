import express from "express";
import googleLogin from "../controllers/googleLogin.contollers.js";

const router = express.Router();
router.post("/google", googleLogin);

export default router;