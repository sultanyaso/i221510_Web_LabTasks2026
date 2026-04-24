import { useMarkets, useSearch } from '../hooks/useCrypto'
import { useSettings } from '../context/SettingsContext'
import CryptoList from '../components/CryptoList'
import FavoriteCoins from '../components/FavoriteCoins'
import SearchBar from '../components/SearchBar'
import { timeAgo } from '../utils/format'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { coins, loading, error, lastUpdated, refresh } = useMarkets()
  const { query, setQuery, filtered } = useSearch(coins)
  const { favorites } = useSettings()

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Live Crypto Markets</h1>
          <p className={styles.subtitle}>Real-time prices · auto-refreshes every 60s</p>
        </div>
        <div className={styles.meta}>
          {lastUpdated && <span className={styles.updated}>Updated {timeAgo(lastUpdated)}</span>}
          <button className={styles.refreshBtn} onClick={refresh} disabled={loading}>
            {loading ? '◌' : '↺'} Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          ⚠ {error}
        </div>
      )}

      {favorites.length > 0 && !query && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⭐ Your Favorites</h2>
          <FavoriteCoins coins={coins} />
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.listHeader}>
          <h2 className={styles.sectionTitle}>All Markets</h2>
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {!loading && filtered.length === 0 && query && (
          <div className={styles.noResults}>No coins found matching "{query}"</div>
        )}

        <CryptoList coins={filtered} loading={loading} />
      </section>
    </div>
  )
}
