import express from 'express';
import { payment } from '../controllers/payment.controllers.js';

const router = express.Router();
router.route('/').get(payment);

export default router;