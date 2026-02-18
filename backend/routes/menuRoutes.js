import express from 'express';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getMenu)
    .post(protect, addMenuItem);

router.route('/:id')
    .put(protect, updateMenuItem)
    .delete(protect, deleteMenuItem);

export default router;
