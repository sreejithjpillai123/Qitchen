'use client';
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import styles from './menu.module.css';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const suffix = (day === 1 || day === 21 || day === 31) ? 'ST'
        : (day === 2 || day === 22) ? 'ND'
            : (day === 3 || day === 23) ? 'RD' : 'TH';
    return `${day}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await api.get('/menu');
                const items = res.data;
                setMenuItems(items);

                // Group by category
                const grouped = items.reduce((acc, item) => {
                    const cat = item.category || 'Others';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(item);
                    return acc;
                }, {});

                // Optional: Sort categories if needed, for example alphabetical or custom
                const sortedCategories = Object.keys(grouped).sort();

                const sortedGrouped = {};
                sortedCategories.forEach(key => {
                    sortedGrouped[key] = grouped[key];
                });

                setCategories(sortedGrouped);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch menu:', error);
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) return <div style={{ minHeight: '100vh', background: '#0f1011', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Menu...</div>;

    const visibleCategories = selectedCategory === 'All' ? Object.keys(categories) : [selectedCategory];

    return (
        <div className={styles.container}>
            {/* Left Side: Hero Image */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.pageTitle}>Menu</div>
            </div>

            {/* Right Side: Wrapper with Navigation and Content */}
            <div className={styles.rightSection}>

                {/* Navigation Options */}
                <div className={styles.menuNav}>
                    <button
                        className={`${styles.navButton} ${selectedCategory === 'All' ? styles.navButtonActive : ''}`}
                        onClick={() => setSelectedCategory('All')}
                    >
                        All
                    </button>
                    {Object.keys(categories).map(cat => (
                        <button
                            key={cat}
                            className={`${styles.navButton} ${selectedCategory === cat ? styles.navButtonActive : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Scrollable Menu List */}
                <div className={styles.menuContent}>
                    {Object.keys(categories).length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>No menu items found.</p>
                    ) : (
                        visibleCategories.map((category) => (
                            <div key={category} className={styles.categorySection}>
                                <h2 className={styles.categoryTitle}>{category}</h2>

                                {categories[category].map((item) => (
                                    <div key={item._id} className={styles.menuItem}>
                                        {/* Image is optional, show placeholder if missing or check if user wants to upload image url */}
                                        <img
                                            src={item.image || "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=150&auto=format&fit=crop"}
                                            alt={item.name}
                                            className={styles.itemImage}
                                        />

                                        <div className={styles.itemDetails}>
                                            {/* Date label above title */}
                                            <div className={styles.itemDate}>
                                                <span className={styles.itemDateDiamond}>◇</span>
                                                {formatDate(item.createdAt)}
                                            </div>

                                            <div className={styles.itemHeader}>
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemPrice}>${item.price}</span>
                                            </div>
                                            <p className={styles.itemDesc}>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
