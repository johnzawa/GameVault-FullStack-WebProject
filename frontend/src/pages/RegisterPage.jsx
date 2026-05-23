import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Added useNavigate
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const navigate = useNavigate() // Initialize hook for redirection

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => { 
    e.preventDefault(); 

    // 1. Password Length Check (Requirement: min 8 characters)[cite: 1]
    if (form.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return; 
    }

    // 2. Password Match Check[cite: 1]
    if (form.password !== form.confirm) {
      alert('Passwords do not match.');
      return; 
    }

    // 3. Successful Validation Redirect[cite: 1]
    // Since this is a demo, we redirect to the home page upon success[cite: 1]
    navigate('/'); 
  }

  return (
    <div className="page-wrapper">
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Join the vault</div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.sub}>Start tracking your game collection.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required // Added HTML5 validation[cite: 1]
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                className={styles.input}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                className={styles.input}
                placeholder="Repeat password"
                value={form.confirm}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Create Account
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.switchLink}>Sign in</Link>
          </p>
        </div>

        <div className={styles.deco}>
          <div className={styles.decoTitle}>GAME<br />VAULT</div>
          <div className={styles.decoSub}>The definitive game catalog.</div>
        </div>
      </div>
    </div>
  )
}