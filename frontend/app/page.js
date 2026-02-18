import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Left Main Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>



        {/* Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Sushi <br /> Sensation</h1>
        </div>

        {/* Social Icons */}
        <div className={styles.socialIcons}>
          <div className={styles.socialIcon}>IG</div>
          <div className={styles.socialIcon}>FB</div>
          <div className={styles.socialIcon}>TW</div>
        </div>
      </div>

      {/* Right Sidebar Grid */}
      <div className={styles.sidebar}>

        {/* Menu Card */}
        <Link href="/menu" className={`${styles.card} ${styles.menuCard}`}>
          <span className={styles.cardTitle}>Menu</span>
          <div className={styles.arrowIcon}>→</div>
        </Link>

        {/* Reservation Card */}
        <Link href="/reservations" className={`${styles.card} ${styles.reservationCard}`}>
          <span className={styles.cardTitle}>Reservation</span>
          <div className={styles.arrowIcon}>→</div>
        </Link>

        {/* Restaurant Card (About) */}
        <Link href="/about" className={`${styles.card} ${styles.restaurantCard}`}>
          <span className={styles.cardTitle}>Our Restaurant</span>
          <div className={styles.arrowIcon}>→</div>
        </Link>

      </div>
    </div>
  );
}
