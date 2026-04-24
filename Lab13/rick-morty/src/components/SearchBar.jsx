export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder="Search characters by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} title="Clear">✕</button>
      )}
    </div>
  );
}
