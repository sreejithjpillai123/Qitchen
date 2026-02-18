import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Starters', 'Mains', 'Desserts'
    image: { type: String }, // URL to image
    available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', MenuItemSchema);
