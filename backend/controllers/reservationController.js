import Reservation from '../models/Reservation.js';
import OpeningHours from '../models/OpeningHours.js';

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = async (req, res) => {
    const { name, email, phone, date, time, partySize } = req.body;

    try {
        // 1. Get day of week from date
        const reservationDate = new Date(date);
        const options = { weekday: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(reservationDate);

        // 2. Check Opening Hours
        const hours = await OpeningHours.findOne({ day: dayOfWeek });
        if (!hours || hours.isClosed) {
            return res.status(400).json({ message: 'Restaurant is closed on this day.' });
        }

        // 3. Check Time Slot (Simple Logic: Must be within open and close time)
        // convert time "19:00" to comparable value
        const [resHour, resMinute] = time.split(':').map(Number);
        const [openHour, openMinute] = hours.openTime.split(':').map(Number);
        const [closeHour, closeMinute] = hours.closeTime.split(':').map(Number);

        const resTimeVal = resHour * 60 + resMinute;
        const openTimeVal = openHour * 60 + openMinute;
        const closeTimeVal = closeHour * 60 + closeMinute;

        if (resTimeVal < openTimeVal || resTimeVal >= closeTimeVal) {
            return res.status(400).json({ message: 'Selected time is outside of operating hours.' });
        }

        // 4. Check Availability (Optional: limit to X concurrent reservations)
        // For now, let's assume unlimited or just check if we have too many for this specific slot
        const existingReservations = await Reservation.countDocuments({ date: reservationDate, time });
        if (existingReservations >= 10) { // arbitrary limit
            return res.status(400).json({ message: 'No availability for this time slot.' });
        }

        const reservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            partySize
        });

        await reservation.save();
        res.status(201).json(reservation);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ date: 1, time: 1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
