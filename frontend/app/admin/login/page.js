'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';

import styles from '../admin.module.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/admin/login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('adminUser', JSON.stringify(res.data));
            router.push('/admin/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Admin Login</h2>
                {error && <p className={styles.alertError}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.formInputLabel}>Username</label>
                        <input type="text" className={styles.formInput} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.formInputLabel}>Password</label>
                        <input type="password" className={styles.formInput} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.btnPrimary}>Login</button>
                </form>
            </div>
        </div>
    );
}
