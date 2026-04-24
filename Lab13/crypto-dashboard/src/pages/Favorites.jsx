import { useMarkets } from '../hooks/useCrypto'
import FavoriteCoins from '../components/FavoriteCoins'
import styles from './Favorites.module.css'

export default function Favorites() {
  const { coins, loading } = useMarkets()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>⭐ Your Favorites</h1>
        <p className={styles.subtitle}>Coins you've starred for quick access</p>
      </div>
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      ) : (
        <FavoriteCoins coins={coins} />
      )}
    </div>
  )
}
