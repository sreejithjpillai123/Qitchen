'use client';
import styles from '../admin.module.css';
import { useState, useEffect } from 'react';
import api from '../../../lib/api';

const EMPTY_SECTION = { heading: '', paragraph: '' };

// Try to parse detailContent as JSON sections, fall back to single paragraph
function parseDetailContent(detailContent) {
    if (!detailContent) return [{ ...EMPTY_SECTION }];
    try {
        const parsed = JSON.parse(detailContent);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) { /* not JSON */ }
    // Legacy: plain text — treat as one paragraph with no heading
    return [{ heading: '', paragraph: detailContent }];
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', subtitle: '', content: '', image: '' });
    const [sections, setSections] = useState([{ ...EMPTY_SECTION }]);
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
        // Filter out totally empty sections
        const validSections = sections.filter(s => s.heading.trim() || s.paragraph.trim());
        const detailContent = validSections.length > 0 ? JSON.stringify(validSections) : '';
        const payload = { ...form, detailContent };

        try {
            if (editingId) {
                await api.put(`/blogs/${editingId}`, payload);
            } else {
                await api.post('/blogs', payload);
            }
            setForm({ title: '', subtitle: '', content: '', image: '' });
            setSections([{ ...EMPTY_SECTION }]);
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
        setForm({
            title: blog.title || '',
            subtitle: blog.subtitle || '',
            content: blog.content || '',
            image: blog.image || '',
        });
        setSections(parseDetailContent(blog.detailContent));
        setEditingId(blog._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this blog?')) {
            await api.delete(`/blogs/${id}`);
            fetchBlogs();
        }
    };

    const handleCancel = () => {
        setForm({ title: '', subtitle: '', content: '', image: '' });
        setSections([{ ...EMPTY_SECTION }]);
        setEditingId(null);
    };

    // Section helpers
    const updateSection = (index, field, value) => {
        setSections(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
    };
    const addSection = () => setSections(prev => [...prev, { ...EMPTY_SECTION }]);
    const removeSection = (index) => setSections(prev => prev.filter((_, i) => i !== index));
    const moveSection = (index, direction) => {
        setSections(prev => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return next;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    return (
        <div>
            <h2 className={styles.pageHeader}>Manage Blogs</h2>

            <form onSubmit={handleSubmit} className={styles.formContainer}>

                {/* ── Basic Info ── */}
                <div className={styles.inputGrid}>
                    <input
                        placeholder="Date/Subtitle (e.g. 24TH AUG 2023)"
                        className={styles.formInput}
                        value={form.subtitle}
                        onChange={e => setForm({ ...form, subtitle: e.target.value })}
                    />
                    <input
                        placeholder="Blog Title"
                        className={styles.formInput}
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Image URL"
                        className={styles.formInput}
                        value={form.image}
                        onChange={e => setForm({ ...form, image: e.target.value })}
                    />
                    <textarea
                        placeholder="Short Excerpt (shown on Blog List page)"
                        className={styles.formTextarea}
                        style={{ gridColumn: '1 / -1', minHeight: '90px' }}
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        required
                    />
                </div>

                {/* ── Section Builder ── */}
                <div style={{ marginTop: '2rem' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: '1rem'
                    }}>
                        <p style={{
                            color: '#d4a373', fontWeight: 600,
                            fontSize: '1rem', margin: 0, letterSpacing: '0.5px'
                        }}>
                            📝 Blog Sections (Detail Page)
                        </p>
                        <span style={{ color: '#666', fontSize: '0.8rem' }}>
                            Each section = one heading + one paragraph block
                        </span>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} style={{
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '10px',
                            padding: '1.25rem',
                            marginBottom: '1rem',
                            position: 'relative'
                        }}>
                            {/* Section label */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', marginBottom: '0.75rem'
                            }}>
                                <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 500 }}>
                                    Section {index + 1}
                                </span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => moveSection(index, -1)}
                                        disabled={index === 0}
                                        style={iconBtnStyle}
                                        title="Move up"
                                    >↑</button>
                                    <button
                                        type="button"
                                        onClick={() => moveSection(index, 1)}
                                        disabled={index === sections.length - 1}
                                        style={iconBtnStyle}
                                        title="Move down"
                                    >↓</button>
                                    {sections.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            style={{ ...iconBtnStyle, color: '#ff6b6b' }}
                                            title="Remove section"
                                        >✕</button>
                                    )}
                                </div>
                            </div>

                            {/* Heading input */}
                            <input
                                placeholder="Section Heading (e.g. UNVEILING CULINARY ARTISTRY)"
                                className={styles.formInput}
                                value={section.heading}
                                onChange={e => updateSection(index, 'heading', e.target.value)}
                                style={{ marginBottom: '0.75rem' }}
                            />

                            {/* Paragraph textarea */}
                            <textarea
                                placeholder="Section paragraph text..."
                                className={styles.formTextarea}
                                style={{ minHeight: '100px', width: '100%' }}
                                value={section.paragraph}
                                onChange={e => updateSection(index, 'paragraph', e.target.value)}
                            />
                        </div>
                    ))}

                    {/* Add section button */}
                    <button
                        type="button"
                        onClick={addSection}
                        style={{
                            background: 'none',
                            border: '1px dashed #444',
                            color: '#888',
                            borderRadius: '8px',
                            padding: '0.65rem 1.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            width: '100%',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = '#d4a373'; e.target.style.color = '#d4a373'; }}
                        onMouseLeave={e => { e.target.style.borderColor = '#444'; e.target.style.color = '#888'; }}
                    >
                        + Add Section
                    </button>
                </div>

                {/* Submit / Cancel */}
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                    <button type="submit" className={styles.btnPrimary} disabled={saving}>
                        {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className={styles.btnSecondary}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Blog List */}
            <div className={styles.listContainer}>
                {blogs.map(blog => (
                    <div key={blog._id} className={styles.listItem}>
                        <div className={styles.itemInfo}>
                            <div className={styles.itemDetails}>
                                <h4>{blog.title}</h4>
                                <p className={styles.itemMeta}>
                                    {new Date(blog.createdAt).toLocaleDateString()} • {blog.subtitle}
                                </p>
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

const iconBtnStyle = {
    background: 'none',
    border: '1px solid #333',
    color: '#888',
    borderRadius: '5px',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
};
