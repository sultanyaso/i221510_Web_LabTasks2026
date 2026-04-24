import styles from './SearchBar.module.css'

export default function SearchBar({ query, setQuery, placeholder = 'Search coins…' }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>⌕</span>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <button className={styles.clear} onClick={() => setQuery('')}>✕</button>
      )}
    </div>
  )
}
