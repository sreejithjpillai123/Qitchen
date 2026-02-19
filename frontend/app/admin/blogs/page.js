'use client';
import styles from '../admin.module.css';
import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', subtitle: '', content: '', detailContent: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await api.get('/blogs');
        setBlogs(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingId) {
                await api.put(`/blogs/${editingId}`, form);
            } else {
                await api.post('/blogs', form);
            }

            setForm({ title: '', subtitle: '', content: '', detailContent: '', image: '' });
            setEditingId(null);
            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog post');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (blog) => {
        setForm(blog);
        setEditingId(blog._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this blog?')) {
            await api.delete(`/blogs/${id}`);
            fetchBlogs();
        }
    };

    const handleCancel = () => {
        setForm({ title: '', subtitle: '', content: '', detailContent: '', image: '' });
        setEditingId(null);
    };

    return (
        <div>
            <h2 className={styles.pageHeader}>Manage Blogs</h2>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.inputGrid}>
                    <input placeholder="24TH AUG 2023 (Subtitle)" className={styles.formInput} value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                    <input placeholder="Title" className={styles.formInput} value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} required />

                    <input placeholder="Image URL" className={styles.formInput} value={form.image || ''} onChange={e => setForm({ ...form, image: e.target.value })} />

                    <textarea placeholder="Short Excerpt (Shown on Blog List)" className={styles.formTextarea} style={{ gridColumn: '1 / -1', minHeight: '100px' }} value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} required />

                    <textarea
                        placeholder="Detailed Content (Only shown on Single Blog Page)"
                        className={styles.formTextarea}
                        style={{ gridColumn: '1 / -1', minHeight: '200px' }}
                        value={form.detailContent || ''}
                        onChange={e => setForm({ ...form, detailContent: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                    <button type="submit" className={styles.btnPrimary} disabled={saving}>
                        {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
                    </button>
                    {editingId && <button type="button" onClick={handleCancel} className={styles.btnSecondary}>Cancel</button>}
                </div>
            </form>

            <div className={styles.listContainer}>
                {blogs.map(blog => (
                    <div key={blog._id} className={styles.listItem}>
                        <div className={styles.itemInfo}>
                            <div className={styles.itemDetails}>
                                <h4>{blog.title}</h4>
                                <p className={styles.itemMeta}>{new Date(blog.createdAt).toLocaleDateString()} • {blog.subtitle}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(blog)} className={styles.btnEdit}>Edit</button>
                            <button onClick={() => handleDelete(blog._id)} className={styles.btnDanger}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
