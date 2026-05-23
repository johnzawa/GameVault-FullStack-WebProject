import { useState } from 'react'
import api from '../api'
import styles from './AddGameModal.module.css'

const EMPTY = {
  title: '', developer: '', publisher: '', genre: '',
  platform: '', year: '', rating: '', price: '', metacritic: '', status: 'Available'
}

export default function AddGameModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        rating: Number(form.rating),
        price: Number(form.price),
        metacritic: form.metacritic !== '' ? Number(form.metacritic) : undefined,
      }
      const res = await api.post('/games', payload)
      onAdd(res.data)
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to add game')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Authenticated</div>
            <h2 className={styles.title}>Add Game</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input name="title" className={styles.input} value={form.title} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Developer</label>
              <input name="developer" className={styles.input} value={form.developer} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Publisher</label>
              <input name="publisher" className={styles.input} value={form.publisher} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Genre</label>
              <input name="genre" className={styles.input} value={form.genre} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Platform</label>
              <input name="platform" className={styles.input} value={form.platform} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Year</label>
              <input name="year" type="number" className={styles.input} value={form.year} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rating (0–10)</label>
              <input name="rating" type="number" step="0.1" min="0" max="10" className={styles.input} value={form.rating} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price ($)</label>
              <input name="price" type="number" step="0.01" min="0" className={styles.input} value={form.price} onChange={handleChange} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Metacritic <span className={styles.optional}>(optional)</span></label>
              <input name="metacritic" type="number" min="0" max="100" className={styles.input} value={form.metacritic} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select name="status" className={styles.input} value={form.status} onChange={handleChange}>
                <option>Available</option>
                <option>Early Access</option>
                <option>Coming Soon</option>
              </select>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding…' : 'Add Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
