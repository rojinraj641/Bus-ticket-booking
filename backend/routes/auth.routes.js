import express from "express";
import refreshToken from "../controllers/refreshToken.controllers.js";

const router = express.Router();

router.post("/refresh", refreshToken);

export default router;