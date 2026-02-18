'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    // If on the navigation page, we can hide the menu button or change its text
    // For now, let's keep it simple as requested, just a link.

    // Check if we are on the site-navigation page
    const onNavPage = pathname === '/site-navigation';

    return (
        <nav className={styles.navbarContainer}>
            {/* Menu Icon (Hamburger) links to nav page */}
            <Link href={onNavPage ? "/" : "/site-navigation"} className={styles.menuIcon} style={{ textDecoration: 'none' }}>
                {onNavPage ? (
                    // Close icon (X) style
                    <div style={{ color: '#dad2bc', fontSize: '1.5rem' }}>✕</div>
                ) : (
                    <>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </>
                )}
            </Link>

            {/* Logo */}
            <Link href="/" className={styles.logo}>
                Qitchen
            </Link>

            {/* Links */}
            <div className={styles.navLinks}>
                {/* Replaced Button with Link to Navigation Page */}
                <Link href="/site-navigation" className={styles.link}>Menu</Link>

                <Link href="/blogs" className={styles.link}>Blog</Link>
                <Link href="/about" className={styles.link}>About</Link>
            </div>

            {/* Book Button */}
            <Link href="/reservations" className={styles.bookBtn}>
                Book a Table
            </Link>
        </nav>
    );
}
