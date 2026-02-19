'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '../../../lib/api';
import styles from '../blog-post.module.css';

export default function SingleBlogPage() {
    const { id } = useParams();
    const router = useRouter();
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

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '5rem' }}>Loading...</div>;
    if (error) return <div style={{ color: '#f44336', textAlign: 'center', marginTop: '5rem' }}>{error}</div>;
    if (!blog) return null;

    return (
        <div className={styles.container}>
            {/* Left Section - Image */}
            <div
                className={styles.imageSection}
                style={{ backgroundImage: `url('${blog.image || '/images/default-blog.jpg'}')` }}
            >
                {/* Image is set as background */}
            </div>

            {/* Right Section - Content */}
            <div className={styles.contentSection}>
                <div className={styles.headerDate}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <div className={styles.title}>{blog.title}</div>

                <div className={styles.contentBody}>
                    {/* Render content with line breaks */}
                    {/* Main Excerpt */}
                    {/* <p>{blog.content}</p> */}

                    {/* Detailed Content */}
                    {blog.detailContent && (
                        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
                            {blog.detailContent}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <span>By Pawel Gola</span> {/* Or author if available */}
                    <span>◇</span>
                    <span>Licensing</span>
                    <span>◇</span>
                    <span>Styleguide</span>
                </div>

                {/* Back Link for UX */}
                {/* <button
                    onClick={() => router.back()}
                    style={{
                        marginTop: '20px',
                        background: 'none',
                        border: '1px solid #333',
                        color: '#666',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        alignSelf: 'center',
                        borderRadius: '30px',
                        fontSize: '0.8rem'
                    }}
                >
                    ← Back to Blogs
                </button> */}
            </div>
        </div>
    );
}
