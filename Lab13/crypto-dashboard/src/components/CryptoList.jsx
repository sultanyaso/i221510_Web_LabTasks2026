import { useState } from 'react'
import PriceCard from './PriceCard'
import styles from './CryptoList.module.css'

const SORTS = [
  { key: 'market_cap_rank', label: 'Rank' },
  { key: 'current_price', label: 'Price' },
  { key: 'price_change_percentage_24h', label: '24h %' },
  { key: 'market_cap', label: 'Market Cap' },
]

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className="skeleton" style={{ width: 24, height: 24, borderRadius: '50%' }} />
      <div className="skeleton" style={{ width: 140, height: 16 }} />
      <div className="skeleton" style={{ width: 80, height: 16 }} />
      <div className="skeleton" style={{ width: 60, height: 24, borderRadius: 6 }} />
      <div className="skeleton" style={{ width: 80, height: 16 }} />
    </div>
  )
}

export default function CryptoList({ coins, loading }) {
  const [sortKey, setSortKey] = useState('market_cap_rank')
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir(key === 'market_cap_rank' ? 'asc' : 'desc') }
  }

  const sorted = [...coins].sort((a, b) => {
    const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0
    return sortDir === 'asc' ? av - bv : bv - av
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerRank}>#</div>
        <div className={styles.headerCoin}>Coin</div>
        <div className={styles.headerPrice}>Price</div>
        {SORTS.slice(2).map(s => (
          <button
            key={s.key}
            className={`${styles.sortBtn} ${sortKey === s.key ? styles.sortActive : ''}`}
            onClick={() => handleSort(s.key)}
          >
            {s.label}
            {sortKey === s.key && <span>{sortDir === 'asc' ? ' ↑' : ' ↓'}</span>}
          </button>
        ))}
        <div />
        <div />
      </div>

      <div className={styles.list}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((coin, i) => (
            <PriceCard key={coin.id} coin={coin} rank={coin.market_cap_rank ?? i + 1} />
          ))
        }
      </div>
    </div>
  )
}
