import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Added useNavigate
import styles from './AuthPage.module.css'
import { useAuth } from '../context/AuthContext'


export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate(); // Initialize the hook

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  
  const { login } = useAuth()

const handleSubmit = async e => {
  e.preventDefault()
  try {
    await login(form.email, form.password)
    navigate('/')
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed')
  }
}

  return (
    <div className="page-wrapper">
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Welcome back</div>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.sub}>Access your GameVault account.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>Register</Link>
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