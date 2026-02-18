'use client';
import { useState, useEffect } from 'react';
import api from '../../lib/api'; // Adjust path according to your project structure
import styles from './contact.module.css';

export default function ContactPage() {
    const [hours, setHours] = useState([]);

    useEffect(() => {
        const fetchHours = async () => {
            try {
                const res = await api.get('/hours');
                // Ensure days are sorted correctly
                const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const sorted = res.data.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

                // Group Saturday & Sunday if they have same hours (optional logic, keeping simple for now)
                // For this demo, we'll list them all or group visually if data allows.
                setHours(sorted);
            } catch (err) {
                console.error('Failed to fetch hours', err);
            }
        };
        fetchHours();
    }, []);

    return (
        <div className={styles.pageContainer}>
            {/* Left Section - Hero Image with Title */}
            <div className={styles.heroSection} style={{ backgroundImage: "url('/images/contact.png')" }}>
                {/* Note: User needs to add an image at /public/img/contact-hero.jpg or update this path */}
                <div className={styles.heroTitle}>CONTACT</div>
            </div>

            {/* Right Section - Grid Content */}
            <div className={styles.contentSection}>
                <div className={styles.gridContainer}>

                    {/* 1. Opening Hours Card */}
                    <div className={styles.card + ' ' + styles.hoursCard}>
                        <h2 className={styles.sectionTitle}>OPENING HOURS</h2>
                        <div className={styles.hoursList}>
                            {hours.length > 0 ? (
                                hours.map(h => (
                                    <div key={h._id} className={styles.hourItem}>
                                        <span className={styles.day}>{h.day}</span>
                                        <span className={styles.time}>{h.isClosed ? 'Closed' : `${h.openTime} - ${h.closeTime}`}</span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#666' }}>Loading hours...</p>
                            )}
                        </div>
                    </div>

                    {/* 2. Image Grid Card (Top Right) */}
                    <div className={styles.imagesCard}>
                        {/* Placeholders - Ideally these are from Instagram or Gallery */}
                        <img src="/images/contact1.png" alt="Dish 1" className={styles.gridImage} />
                        <img src="/images/contact2.png" alt="Dish 2" className={styles.gridImage} />
                        <img src="/images/contact3.png" alt="Chef" className={styles.gridImage} />
                        <img src="/images/contact1.png" alt="Interior" className={styles.gridImage} />
                    </div>

                    {/* 3. Map Card (Bottom Left) */}
                    <div className={styles.mapCard}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925916665!2d-80.29949920263963!3d25.782390733064336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL%2C%20USA!5e0!3m2!1sen!2sin!4v1692268482329!5m2!1sen!2sin"
                            className={styles.mapFrame}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <button className={styles.showRouteBtn}>Show Route →</button>
                    </div>

                    {/* 4. Contact Info Card (Bottom Right) */}
                    <div className={styles.card + ' ' + styles.contactCard}>
                        <h2 className={styles.sectionTitle}>GET IN TOUCH</h2>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Address</span>
                                <span className={styles.contactValue}>23 Greenfield Avenue, Prague 120 00</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Phone</span>
                                <span className={styles.contactValue}>+49 1234 567890</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Email</span>
                                <span className={styles.contactValue}>email@example.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Follow</span>
                                <div className={styles.socialIcons}>
                                    <span className={styles.socialIcon}>fb</span>
                                    <span className={styles.socialIcon}>ig</span>
                                    <span className={styles.socialIcon}>tw</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Line */}
                <div className={styles.footerLine}>
                    By Pawel Gola &nbsp; ◇ &nbsp; Licensing &nbsp; ◇ &nbsp; Styleguide
                </div>
            </div>
        </div>
    );
}
