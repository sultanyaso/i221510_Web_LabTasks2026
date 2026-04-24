import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { formatPrice, formatPercent } from '../utils/format'
import styles from './FavoriteCoins.module.css'

export default function FavoriteCoins({ coins }) {
  const { favorites, isFavorite, toggleFavorite, currencySymbol } = useSettings()
  const favCoins = coins.filter(c => isFavorite(c.id))

  if (favorites.length === 0) return (
    <div className={styles.empty}>
      <span>☆</span>
      <p>No favorites yet — click ☆ on any coin to add it here</p>
    </div>
  )

  return (
    <div className={styles.grid}>
      {favCoins.map(coin => {
        const isUp = (coin.price_change_percentage_24h || 0) >= 0
        return (
          <Link key={coin.id} to={`/coin/${coin.id}`} className={styles.card}>
            <div className={styles.top}>
              <img src={coin.image} alt={coin.name} className={styles.icon} />
              <button className={styles.remove} onClick={e => { e.preventDefault(); toggleFavorite(coin.id) }} title="Remove">✕</button>
            </div>
            <div className={styles.name}>{coin.name}</div>
            <div className={styles.symbol}>{coin.symbol.toUpperCase()}</div>
            <div className={styles.price}>{formatPrice(coin.current_price, currencySymbol)}</div>
            <div className={`${styles.change} ${isUp ? styles.up : styles.down}`}>
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
