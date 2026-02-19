'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import styles from './blogs.module.css';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const suffix = (day === 1 || day === 21 || day === 31) ? 'ST' : (day === 2 || day === 22) ? 'ND' : (day === 3 || day === 23) ? 'RD' : 'TH';
    return `${day}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blogs');
                setBlogs(res.data);
            } catch (error) {
                console.error('Failed to fetch blogs', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div style={{ minHeight: '100vh', background: '#0f1011', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Blogs...</div>;

    return (
        <div className={styles.container}>
            {/* Left Side: Hero Image */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.pageTitle}>Blog</div>
            </div>

            {/* Right Side: Blog List */}
            <div className={styles.blogListContent}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionSubtitle}>BEHIND THE SCENES <br /> & LATEST NEWS</div>
                </div>

                {blogs.length === 0 ? <p style={{ textAlign: 'center', marginTop: '50px' }}>No blog posts available.</p> : (
                    blogs.map(blog => (
                        <div key={blog._id} className={styles.blogItem}>
                            <Link href={`/blogs/${blog._id}`} className={styles.blogImageContainer}>
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop"}
                                    alt={blog.title}
                                    className={styles.blogImage}
                                />
                            </Link>
                            <Link href={`/blogs/${blog._id}`} className={styles.blogDetails} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className={styles.dateRow}>
                                    <img src="/images/arrow.png" alt="arrow" className={styles.arrowIcon} />
                                    <span className={styles.blogDate}>{formatDate(blog.createdAt)}</span>
                                </div>
                                <div className={styles.blogTitle}>{blog.title}</div>
                                <p className={styles.blogExcerpt}>{blog.content.substring(0, 100)}...</p>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
