import mongoose from 'mongoose';

const OpeningHoursSchema = new mongoose.Schema({
    day: { type: String, required: true, unique: true }, // e.g., 'Monday', 'Tuesday'
    openTime: { type: String }, // e.g., '09:00'
    closeTime: { type: String }, // e.g., '22:00'
    isClosed: { type: Boolean, default: false }
});

export default mongoose.model('OpeningHours', OpeningHoursSchema);
