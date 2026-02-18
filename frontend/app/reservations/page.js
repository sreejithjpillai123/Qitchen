'use client';
import { useState, useEffect, useCallback } from 'react';
import api from '../../lib/api';
import styles from './reservations.module.css';

export default function ReservationPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        partySize: ""
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [hours, setHours] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotMessage, setSlotMessage] = useState('TIme');

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchHours = async () => {
            try {
                const res = await api.get('/hours'); // Fetches from http://localhost:5000/api/hours
                setHours(res.data);
            } catch (err) {
                console.error('Failed to fetch hours:', err);
            }
        };
        fetchHours();
    }, []);

    const formatTime = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const generateSlots = useCallback((selectedDateStr) => {
        if (!hours.length || !selectedDateStr) return;

        const dateObj = new Date(selectedDateStr);
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const dayHours = hours.find(h => h.day === dayOfWeek);

        if (!dayHours || dayHours.isClosed) {
            setAvailableSlots([]);
            setSlotMessage(`Closed on ${dayOfWeek}s`);
            return;
        }

        const [openH, openM] = dayHours.openTime.split(':').map(Number);
        const [closeH, closeM] = dayHours.closeTime.split(':').map(Number);
        let currentMinutes = openH * 60 + openM;
        const closeMinutes = closeH * 60 + closeM;
        const slots = [];

        while (currentMinutes <= closeMinutes - 60) {
            slots.push(formatTime(currentMinutes));
            currentMinutes += 30;
        }

        setAvailableSlots(slots);
        setSlotMessage(slots.length > 0 ? 'Select Time' : 'Fully Booked');
    }, [hours]);

    useEffect(() => {
        if (formData.date) {
            generateSlots(formData.date);
            setFormData(prev => ({ ...prev, time: '' }));
        }
    }, [formData.date, generateSlots]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: ' processing...' });

        if (!formData.time) {
            setStatus({ type: 'error', message: 'Please select a time.' });
            return;
        }

        try {
            await api.post('/reservations', formData);
            setStatus({ type: 'success', message: 'Reservation confirmed! Check your email.' });
            setFormData({ name: '', email: '', phone: '', date: '', time: '', partySize: 2 });
            setAvailableSlots([]);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Error booking table.' });
        }
    };

    return (
        <div className={styles.container}>
            {/* Left Section - Hero Image */}
            <div className={styles.heroSection} style={{ backgroundImage: "url('/images/reservation.png')" }}>
                {/* Note: User needs an image at /public/img/reservation-hero.jpg or use /images/reservation.jpg */}
                <div className={styles.heroTitle}>BOOK<br />A TABLE</div>
            </div>

            {/* Right Section - Form */}
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.pageTitle}>RESERVATION</div>
                        <p className={styles.subtitle}>Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await.</p>
                    </div>

                    {status.message && (
                        <div className={`${styles.message} ${status.type === 'error' ? styles.error : styles.success}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                className={styles.input}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    name="partySize"
                                    placeholder="Guests"
                                    min="1"
                                    max="20"
                                    className={styles.input}
                                    value={formData.partySize}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="date"
                                    name="date"
                                    className={styles.input}
                                    min={today}
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <select
                                    name="time"
                                    className={styles.input}
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    disabled={availableSlots.length === 0}
                                >
                                    <option value="" disabled>{slotMessage}</option>
                                    {availableSlots.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className={styles.reserveBtn}>
                            {status.type === 'loading' ? 'Reserving...' : 'RESERVE'}
                        </button>
                    </form>
                </div>

                <div className={styles.footer}>
                    <span>By Pawel Gola</span>
                    <span>◇</span>
                    <span>Licensing</span>
                    <span>◇</span>
                    <span>Styleguide</span>
                </div>
            </div>
        </div>
    );
}
