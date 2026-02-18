'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './admin.module.css';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (pathname === '/admin/login') {
            setAuthorized(true); // Login page is always authorized to view
            return;
        }

        const token = localStorage.getItem('adminToken');
        if (!token) {
            setAuthorized(false);
            router.replace('/admin/login'); // Use replace to prevent back navigation
        } else {
            // Optional: Verify token validity with backend here if needed
            setAuthorized(true);
        }
    }, [pathname, router]);

    // If on login page, render children immediately
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!authorized) {
        return null; // Don't render anything while checking or redirecting
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <h3 className={styles.sidebarHeader}>Admin Panel</h3>
                <nav className={styles.navClient}>
                    <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Dashboard</Link>
                    <Link href="/admin/menu" className={pathname.startsWith('/admin/menu') ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Manage Menu</Link>
                    <Link href="/admin/reservations" className={pathname.startsWith('/admin/reservations') ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Reservations</Link>
                    <Link href="/admin/blogs" className={pathname.startsWith('/admin/blogs') ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Manage Blogs</Link>
                    <Link href="/admin/hours" className={pathname.startsWith('/admin/hours') ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Opening Hours</Link>
                </nav>
                <button onClick={() => {
                    localStorage.removeItem('adminToken');
                    router.push('/admin/login');
                }} className={styles.logoutBtn}>
                    Logout
                </button>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
