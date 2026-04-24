import { useSettings } from '../context/SettingsContext'
import styles from './SettingsForm.module.css'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR']

export default function SettingsForm() {
  const { currency, setCurrency, theme, setTheme, alertThreshold, setAlertThreshold, currencySymbol, CURRENCY_SYMBOLS, favorites } = useSettings()

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return alert('Notifications not supported')
    const perm = await Notification.requestPermission()
    alert(perm === 'granted' ? '✅ Notifications enabled!' : '❌ Notifications denied.')
  }

  return (
    <div className={styles.form}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Display Currency</h2>
        <p className={styles.sectionDesc}>Choose your preferred fiat currency for prices</p>
        <div className={styles.currencyGrid}>
          {CURRENCIES.map(c => (
            <button
              key={c}
              className={`${styles.currencyBtn} ${currency === c ? styles.active : ''}`}
              onClick={() => setCurrency(c)}
            >
              <span className={styles.symbol}>{CURRENCY_SYMBOLS[c]}</span>
              <span>{c}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Theme</h2>
        <p className={styles.sectionDesc}>Switch between dark and light modes</p>
        <div className={styles.themeToggle}>
          <button className={`${styles.themeBtn} ${theme === 'dark' ? styles.active : ''}`} onClick={() => setTheme('dark')}>
            ◑ Dark
          </button>
          <button className={`${styles.themeBtn} ${theme === 'light' ? styles.active : ''}`} onClick={() => setTheme('light')}>
            ☀ Light
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Price Alerts</h2>
        <p className={styles.sectionDesc}>Get notified when a price changes by more than this %</p>
        <div className={styles.alertRow}>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={alertThreshold}
            onChange={e => setAlertThreshold(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.alertValue}>{alertThreshold}%</span>
        </div>
        <button className={styles.notifBtn} onClick={requestNotificationPermission}>
          🔔 Enable Browser Notifications
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Saved Favorites</h2>
        <p className={styles.sectionDesc}>
          {favorites.length === 0
            ? 'No favorites saved. Click ☆ on any coin to add it.'
            : `${favorites.length} coin${favorites.length > 1 ? 's' : ''} saved`
          }
        </p>
        {favorites.length > 0 && (
          <div className={styles.favList}>
            {favorites.map(id => (
              <span key={id} className={styles.favTag}>{id}</span>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.sectionDesc}>
          Data provided by <a href="https://coingecko.com" target="_blank" rel="noreferrer" className={styles.link}>CoinGecko</a> · Prices refresh every 60 seconds · Preferences stored in your browser's localStorage
        </p>
      </section>
    </div>
  )
}
