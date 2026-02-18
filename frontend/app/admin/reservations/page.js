'use client';
import styles from '../admin.module.css';
import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await api.get('/reservations');
                setReservations(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div>
            <h2 className={styles.pageHeader}>Reservations</h2>
            <div className={styles.tableContainer}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>Name</th>
                            <th className={styles.tableHeader}>Date</th>
                            <th className={styles.tableHeader}>Time</th>
                            <th className={styles.tableHeader}>Guests</th>
                            <th className={styles.tableHeader}>Contact</th>
                            <th className={styles.tableHeader}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{res.name}</td>
                                <td className={styles.tableCell}>{new Date(res.date).toLocaleDateString()}</td>
                                <td className={styles.tableCell}>{res.time}</td>
                                <td className={styles.tableCell}>{res.partySize}</td>
                                <td className={styles.tableCell}>{res.phone}<br />{res.email}</td>
                                <td className={styles.tableCell}>{res.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reservations.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No reservations found.</p>}
            </div>
        </div>
    );
}
