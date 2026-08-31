import express from 'express';
import payment from '../controllers/payment.controllers.js';
import verifyPayment from '../controllers/verifyPayment.controllers.js';
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route('/create-order').post(auth, payment);
router.route('/verify').post(auth, verifyPayment);

export default router;