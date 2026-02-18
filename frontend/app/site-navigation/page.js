import Link from 'next/link';
import styles from './site-navigation.module.css';

export default function SiteNavigation() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* <div style={{ color: '#333', fontSize: '1.5rem', marginBottom: '-20px' }}>♢</div> */}
                <Link href="/menu" className={styles.link}>Menu</Link>
                <Link href="/reservations" className={styles.link}>Reservation</Link>
                <Link href="/about" className={styles.link}>About</Link>
                <Link href="/contact" className={styles.link}>Contact</Link>
                <Link href="/blogs" className={styles.link}>Blog</Link>
            </div>
        </div>
    );
}
