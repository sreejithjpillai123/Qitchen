import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true, min: 1 },
    // Status can be 'Pending', 'Confirmed', 'Cancelled'
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] }
}, { timestamps: true });

export default mongoose.model('Reservation', ReservationSchema);
