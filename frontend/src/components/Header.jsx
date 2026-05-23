import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import styles from './Header.module.css'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const links = [
    { to: '/', label: 'Catalog' },
    { to: '/about', label: 'About' },
    ...(!user ? [{ to: '/login', label: 'Login' }, { to: '/register', label: 'Register' }] : [])
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span className={styles.logoText}>Game<span className={styles.logoAccent}>Vault</span></span>
        </NavLink>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <button onClick={handleLogout} className={styles.navLink}>
            Logout ({user.name})
          </button>
        )}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
    </header>
  )
}
