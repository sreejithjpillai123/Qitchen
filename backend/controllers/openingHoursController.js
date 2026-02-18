import OpeningHours from '../models/OpeningHours.js';

// @desc    Get all opening hours
// @route   GET /api/hours
// @access  Public
export const getHours = async (req, res) => {
    try {
        const hours = await OpeningHours.find({});
        res.json(hours);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update/Create opening hours
// @route   POST /api/hours
// @access  Private/Admin
export const updateHours = async (req, res) => {
    const { day, openTime, closeTime, isClosed } = req.body;

    try {
        let hours = await OpeningHours.findOne({ day });

        if (hours) {
            hours.openTime = openTime || hours.openTime;
            hours.closeTime = closeTime || hours.closeTime;
            hours.isClosed = isClosed !== undefined ? isClosed : hours.isClosed;
            await hours.save();
        } else {
            hours = new OpeningHours({ day, openTime, closeTime, isClosed });
            await hours.save();
        }

        res.json(hours);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
