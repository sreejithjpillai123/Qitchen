'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import styles from './blogs.module.css';

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
                <h1 className={styles.pageTitle}>Blog</h1>
            </div>

            {/* Right Side: Blog List */}
            <div className={styles.blogListContent}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionSubtitle}>BEHIND THE SCENES <br /> & LATEST NEWS</h2>
                </div>

                {blogs.length === 0 ? <p style={{ textAlign: 'center', marginTop: '50px' }}>No blog posts available.</p> : (
                    blogs.map(blog => (
                        <div key={blog._id} className={styles.blogItem}>
                            <div className={styles.blogImageContainer}>
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop"}
                                    alt={blog.title}
                                    className={styles.blogImage}
                                />
                            </div>
                            <Link href={`/blogs/${blog._id}`} className={styles.blogDetails} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className={styles.blogDate}>{blog.subtitle || new Date(blog.createdAt).toLocaleDateString()}</span>
                                <h3 className={styles.blogTitle}>{blog.title}</h3>
                                <p className={styles.blogExcerpt}>{blog.content.substring(0, 100)}...</p>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
