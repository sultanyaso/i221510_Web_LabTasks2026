import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { formatPrice, formatMarketCap, formatPercent } from '../utils/format'
import styles from './PriceCard.module.css'

function Sparkline({ data }) {
  if (!data || data.length < 2) return null
  const prices = data.map(d => d[1] || d)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  const w = 80, h = 30
  const pts = prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * w
    const y = h - ((p - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  const isUp = prices[prices.length - 1] >= prices[0]
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={styles.spark}>
      <polyline points={pts} fill="none" stroke={isUp ? 'var(--green)' : 'var(--red)'} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function PriceCard({ coin, rank }) {
  const { currencySymbol, isFavorite, toggleFavorite } = useSettings()
  const isUp = (coin.price_change_percentage_24h || 0) >= 0
  const dirClass = coin._direction === 'up' ? styles.flashUp : coin._direction === 'down' ? styles.flashDown : ''

  return (
    <Link to={`/coin/${coin.id}`} className={styles.card}>
      <div className={styles.rank}>{rank}</div>

      <div className={styles.coinInfo}>
        <img src={coin.image} alt={coin.name} className={styles.icon} loading="lazy" />
        <div>
          <div className={styles.name}>{coin.name}</div>
          <div className={styles.symbol}>{coin.symbol.toUpperCase()}</div>
        </div>
      </div>

      <div className={`${styles.price} ${dirClass}`}>
        {formatPrice(coin.current_price, currencySymbol)}
      </div>

      <div className={`${styles.change} ${isUp ? styles.up : styles.down}`}>
        {formatPercent(coin.price_change_percentage_24h)}
      </div>

      <div className={styles.mcap}>{formatMarketCap(coin.market_cap, currencySymbol)}</div>

      <div className={styles.sparkWrap}>
        <Sparkline data={coin.sparkline_in_7d?.price} />
      </div>

      <button
        className={`${styles.fav} ${isFavorite(coin.id) ? styles.favActive : ''}`}
        onClick={e => { e.preventDefault(); toggleFavorite(coin.id) }}
        title={isFavorite(coin.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite(coin.id) ? '★' : '☆'}
      </button>
    </Link>
  )
}
