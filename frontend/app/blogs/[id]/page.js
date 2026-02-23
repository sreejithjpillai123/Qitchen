'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../lib/api';
import styles from '../blog-post.module.css';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const suffix = (day === 1 || day === 21 || day === 31) ? 'ST'
        : (day === 2 || day === 22) ? 'ND'
            : (day === 3 || day === 23) ? 'RD' : 'TH';
    return `${day}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Parse detailContent: try JSON array of {heading, paragraph}, else fall back to plain text
function parseDetailContent(detailContent) {
    if (!detailContent) return null;
    try {
        const parsed = JSON.parse(detailContent);
        if (Array.isArray(parsed) && parsed.length > 0) return { type: 'sections', data: parsed };
    } catch (_) { /* not JSON */ }
    return { type: 'plain', data: detailContent };
}

export default function SingleBlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error('Failed to fetch blog post:', err);
                setError('Blog post not found.');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBlog();
    }, [id]);

    if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '5rem' }}>Loading...</div>;
    if (error) return <div style={{ color: '#f44336', textAlign: 'center', marginTop: '5rem' }}>{error}</div>;
    if (!blog) return null;

    const parsed = parseDetailContent(blog.detailContent);

    return (
        <div className={styles.container}>
            {/* Left Section - Image */}
            <div
                className={styles.imageSection}
                style={{ backgroundImage: `url('${blog.image || '/images/default-blog.jpg'}')` }}
            />

            {/* Right Section - Content */}
            <div className={styles.contentSection}>
                {/* Date */}
                <div className={styles.headerDate}>
                    {formatDate(blog.createdAt)}
                </div>

                {/* Main Title */}
                <div className={styles.title}>{blog.title}</div>

                {/* Thin divider */}
                <div className={styles.titleDivider} />

                {/* Content Body */}
                <div className={styles.contentBody}>
                    {parsed?.type === 'sections' && parsed.data.map((section, i) => (
                        <div key={i} className={styles.sectionBlock}>
                            {section.heading && (
                                <h2 className={styles.sectionHeading}>
                                    {section.heading}
                                </h2>
                            )}
                            {section.paragraph && (
                                <p className={styles.paragraph}>
                                    {section.paragraph}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Fallback: legacy plain text */}
                    {parsed?.type === 'plain' && (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{parsed.data}</div>
                    )}
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <span>By Pawel Gola</span>
                    <span>◇</span>
                    <span>Licensing</span>
                    <span>◇</span>
                    <span>Styleguide</span>
                </div>
            </div>
        </div>
    );
}
