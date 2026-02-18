'use client';
import { useState, useEffect } from 'react';
import api from '../../../lib/api';

import styles from '../admin.module.css';

export default function AdminHoursPage() {
    const [hours, setHours] = useState([]);

    useEffect(() => {
        fetchHours();
    }, []);

    const fetchHours = async () => {
        try {
            const res = await api.get('/hours');
            // Sort logic to keep days in order if needed
            const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const sorted = res.data.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
            setHours(sorted);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (index, field, value) => {
        const newHours = [...hours];
        newHours[index][field] = value;
        setHours(newHours);
    };

    const handleSave = async (dayStatus) => {
        try {
            await api.put(`/hours/${dayStatus._id}`, {
                day: dayStatus.day,
                openTime: dayStatus.openTime,
                closeTime: dayStatus.closeTime,
                isClosed: dayStatus.isClosed
            });
            alert(`Updated ${dayStatus.day}`);
        } catch (error) {
            alert('Failed to update');
        }
    };

    return (
        <div>
            <h2 className={styles.pageHeader}>Opening Hours Configuration</h2>
            <div className={styles.formContainer}>
                {hours.map((h, index) => (
                    <div key={h._id || index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #444' }}>
                        <strong style={{ width: '100px', color: 'var(--secondary-color)' }}>{h.day}</strong>
                        <label className={styles.checkboxLabel}>
                            Closed?
                            <input type="checkbox" className={styles.checkboxInput} checked={h.isClosed} onChange={e => handleChange(index, 'isClosed', e.target.checked)} />
                        </label>
                        {!h.isClosed && (
                            <>
                                <input type="time" className={styles.formInput} style={{ width: 'auto' }} value={h.openTime} onChange={e => handleChange(index, 'openTime', e.target.value)} />
                                <span>to</span>
                                <input type="time" className={styles.formInput} style={{ width: 'auto' }} value={h.closeTime} onChange={e => handleChange(index, 'closeTime', e.target.value)} />
                            </>
                        )}
                        <button onClick={() => handleSave(h)} className={styles.btnPrimary} style={{ padding: '0.5rem 1rem', width: 'auto', marginLeft: 'auto' }}>Save</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
