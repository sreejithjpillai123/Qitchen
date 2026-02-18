import express from 'express';
import { getHours, updateHours } from '../controllers/openingHoursController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getHours);
router.put('/:id', protect, updateHours);

export default router;
