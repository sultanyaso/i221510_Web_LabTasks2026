import { Link, useLocation } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { theme, setTheme, favorites } = useSettings()
  const location = useLocation()

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        <span className={styles.logo}>◈</span>
        <span>CryptoVault</span>
      </Link>

      <div className={styles.links}>
        <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
          Markets
        </Link>
        <Link to="/favorites" className={`${styles.link} ${location.pathname === '/favorites' ? styles.active : ''}`}>
          Favorites
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </Link>
        <Link to="/settings" className={`${styles.link} ${location.pathname === '/settings' ? styles.active : ''}`}>
          Settings
        </Link>
      </div>

      <button
        className={styles.themeToggle}
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        title="Toggle theme"
      >
        {theme === 'dark' ? '☀' : '◐'}
      </button>
    </nav>
  )
}
