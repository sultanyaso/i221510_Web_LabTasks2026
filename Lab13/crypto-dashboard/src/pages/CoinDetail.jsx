import { useParams, Link } from 'react-router-dom'
import { useCoinDetail } from '../hooks/useCrypto'
import { useSettings } from '../context/SettingsContext'
import { formatPrice, formatMarketCap, formatPercent, formatSupply } from '../utils/format'
import PriceChart from '../components/PriceChart'
import styles from './CoinDetail.module.css'

function StatCard({ label, value, highlight }) {
  return (
    <div className={`${styles.stat} ${highlight ? styles.statHighlight : ''}`}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  )
}

export default function CoinDetail() {
  const { id } = useParams()
  const { coin, chart, loading, error } = useCoinDetail(id)
  const { currencySymbol, isFavorite, toggleFavorite } = useSettings()
  const curr = currencySymbol

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.loadingGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`skeleton ${styles.skeletonBlock}`} />
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className={styles.page}>
      <div className={styles.error}>⚠ {error}</div>
      <Link to="/" className={styles.back}>← Back to Markets</Link>
    </div>
  )

  if (!coin) return null

  const md = coin.market_data
  const price = md?.current_price?.usd
  const change24h = md?.price_change_percentage_24h
  const isUp = (change24h || 0) >= 0
  const fav = isFavorite(id)

  // Strip HTML from description
  const desc = coin.description?.en?.replace(/<[^>]*>/g, '').slice(0, 500)

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>← Back to Markets</Link>

      <div className={styles.header}>
        <div className={styles.coinMeta}>
          <img src={coin.image?.large} alt={coin.name} className={styles.logo} />
          <div>
            <h1 className={styles.name}>{coin.name}</h1>
            <span className={styles.symbol}>{coin.symbol?.toUpperCase()}</span>
            <span className={styles.rankBadge}>#{coin.market_cap_rank}</span>
          </div>
        </div>

        <div className={styles.priceBlock}>
          <div className={styles.bigPrice}>{formatPrice(md?.current_price?.[Object.keys(md?.current_price || {})[0]], curr)}</div>
          <div className={`${styles.change24} ${isUp ? styles.up : styles.down}`}>
            {formatPercent(change24h)} (24h)
          </div>
        </div>

        <button
          className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
          onClick={() => toggleFavorite(id)}
        >
          {fav ? '★ Favorited' : '☆ Add to Favorites'}
        </button>
      </div>

      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>7-Day Price Chart</h2>
        <PriceChart data={chart} />
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Current Price" value={formatPrice(md?.current_price?.[Object.keys(md?.current_price || {})[0]], curr)} />
        <StatCard label="Market Cap" value={formatMarketCap(md?.market_cap?.[Object.keys(md?.market_cap || {})[0]], curr)} />
        <StatCard label="24h High" value={formatPrice(md?.high_24h?.[Object.keys(md?.high_24h || {})[0]], curr)} highlight />
        <StatCard label="24h Low" value={formatPrice(md?.low_24h?.[Object.keys(md?.low_24h || {})[0]], curr)} />
        <StatCard label="All-Time High" value={formatPrice(md?.ath?.[Object.keys(md?.ath || {})[0]], curr)} highlight />
        <StatCard label="All-Time Low" value={formatPrice(md?.atl?.[Object.keys(md?.atl || {})[0]], curr)} />
        <StatCard label="Circulating Supply" value={`${formatSupply(md?.circulating_supply)} ${coin.symbol?.toUpperCase()}`} />
        <StatCard label="Total Supply" value={md?.total_supply ? `${formatSupply(md.total_supply)} ${coin.symbol?.toUpperCase()}` : '∞'} />
        <StatCard label="24h Change" value={formatPercent(change24h)} />
        <StatCard label="7d Change" value={formatPercent(md?.price_change_percentage_7d)} />
        <StatCard label="30d Change" value={formatPercent(md?.price_change_percentage_30d)} />
        <StatCard label="Market Cap Rank" value={`#${coin.market_cap_rank}`} />
      </div>

      {desc && (
        <div className={styles.desc}>
          <h2 className={styles.descTitle}>About {coin.name}</h2>
          <p className={styles.descText}>{desc}{desc.length >= 500 ? '…' : ''}</p>
        </div>
      )}

      {coin.links?.homepage?.[0] && (
        <div className={styles.links}>
          <a href={coin.links.homepage[0]} target="_blank" rel="noreferrer" className={styles.extLink}>
            🌐 Official Website
          </a>
          {coin.links?.blockchain_site?.[0] && (
            <a href={coin.links.blockchain_site[0]} target="_blank" rel="noreferrer" className={styles.extLink}>
              🔗 Block Explorer
            </a>
          )}
        </div>
      )}
    </div>
  )
}
