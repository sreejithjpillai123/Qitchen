import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className={styles.pageHeader}>Dashboard</h1>
            <p className={styles.cardDesc}>Welcome to the admin panel. Select a section from the sidebar to manage content.</p>

            <div className={styles.dashboardGrid}>
                <Link href="/admin/menu" className={styles.card} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.cardTitle}>Menu Items</h3>
                    <p className={styles.cardDesc}>Manage your food and drink offerings.</p>
                </Link>
                <Link href="/admin/reservations" className={styles.card} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.cardTitle}>Reservations</h3>
                    <p className={styles.cardDesc}>View upcoming bookings.</p>
                </Link>
                <Link href="/admin/blogs" className={styles.card} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.cardTitle}>Blogs</h3>
                    <p className={styles.cardDesc}>Post updates and news.</p>
                </Link>
                <Link href="/admin/hours" className={styles.card} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.cardTitle}>Opening Hours</h3>
                    <p className={styles.cardDesc}>Update business hours.</p>
                </Link>
            </div>
        </div>
    );
}
