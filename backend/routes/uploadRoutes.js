import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Image upload route
router.post('/upload', protect, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Return the file path
        const imagePath = `/uploads/${req.file.filename}`;
        res.json({
            message: 'Image uploaded successfully',
            imagePath: imagePath
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

export default router;
