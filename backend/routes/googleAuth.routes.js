import express from "express";
import googleLogin from "../controllers/googleLogin.contollers.js";
import googleSignup from "../controllers/googleSignup.controllers.js";

const router = express.Router();
router.post("/login", googleLogin);
router.post("/signup", googleSignup);

export default router;