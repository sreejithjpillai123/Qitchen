'use client';
import styles from '../admin.module.css';
import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export default function AdminMenuPage() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '', available: true });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await api.get('/menu');
        setItems(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/menu/${editingId}`, form);
            } else {
                await api.post('/menu', form);
            }
            setForm({ name: '', description: '', price: '', category: '', image: '', available: true });
            setEditingId(null);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await api.delete(`/menu/${id}`);
            fetchItems();
        }
    };

    return (
        <div>
            <h2 className={styles.pageHeader}>Manage Menu</h2>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.inputGrid}>
                    <input placeholder="Name" className={styles.formInput} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <input placeholder="Price" type="number" className={styles.formInput} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                    <input placeholder="Item" className={styles.formInput} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
                    <input placeholder="Image URL" className={styles.formInput} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                    <textarea placeholder="Description" className={styles.formTextarea} style={{ gridColumn: '1 / -1', minHeight: '100px' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" className={styles.checkboxInput} checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} /> Available
                    </label>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                    <button type="submit" className={styles.btnPrimary}>{editingId ? 'Update Item' : 'Add Item'}</button>
                    {editingId && <button type="button" onClick={() => { setForm({ name: '', description: '', price: '', category: '', image: '', available: true }); setEditingId(null); }} className={styles.btnSecondary}>Cancel</button>}
                </div>
            </form>

            <div className={styles.listContainer}>
                {items.map(item => (
                    <div key={item._id} className={styles.listItem}>
                        <div className={styles.itemInfo}>
                            {item.image && <img src={item.image} alt={item.name} className={styles.itemImage} />}
                            <div className={styles.itemDetails}>
                                <h4>{item.name} (${item.price})</h4>
                                <p className={styles.itemMeta}>{item.category} • {item.available ? 'Available' : 'Unavailable'}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(item)} className={styles.btnEdit}>Edit</button>
                            <button onClick={() => handleDelete(item._id)} className={styles.btnDanger}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
