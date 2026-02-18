import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String }, // New field for subtitle/tagline
    content: { type: String, required: true },
    detailContent: { type: String }, // Extra content only for single page view
    author: { type: String, default: 'Admin' },
    image: { type: String }, // URL to image
}, { timestamps: true });

export default mongoose.model('BlogPost', BlogPostSchema);
