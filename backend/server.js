import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import openingHoursRoutes from './routes/openingHoursRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import Admin from "./models/Admin.js";
import OpeningHours from "./models/OpeningHours.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        console.log("Connected to:", mongoose.connection.host);

        // Seed default admin if not exists
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const defaultAdmin = new Admin({
                username: 'admin',
                password: 'password123'
            });
            await defaultAdmin.save();
            console.log("Default Admin created: username: 'admin', password: 'password123'");
        }

        // Seed default opening hours if not exists
        const hoursCount = await OpeningHours.countDocuments();
        if (hoursCount === 0) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const defaultHours = days.map(day => ({
                day,
                openTime: '09:00',
                closeTime: '22:00',
                isClosed: false
            }));
            await OpeningHours.insertMany(defaultHours);
            console.log("Default Opening Hours created for all days (09:00 - 22:00)");
        }
    })
    .catch(err => console.log(err));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/hours', openingHoursRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});