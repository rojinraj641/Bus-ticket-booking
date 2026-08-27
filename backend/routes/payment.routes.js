import express from 'express';
import { payment } from '../controllers/payment.controllers.js';
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route('/').get(auth, payment);

export default router;