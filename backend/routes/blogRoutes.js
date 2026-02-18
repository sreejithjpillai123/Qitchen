import express from 'express';
import { getBlogs, getBlogById, createBlogPost, updateBlogPost, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, createBlogPost);

router.route('/:id')
    .get(getBlogById)
    .put(protect, updateBlogPost)
    .delete(protect, deleteBlog);

export default router;
