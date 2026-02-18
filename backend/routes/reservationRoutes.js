import express from 'express';
import { createReservation, getReservations } from '../controllers/reservationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(createReservation) // Public
    .get(protect, getReservations); // Private

export default router;
