const SPECIES = ["Human", "Alien", "Humanoid", "Poopybutthole", "Mythological Creature", "Animal", "Robot", "Cronenberg", "Disease", "Unknown"];

export default function FilterPanel({ status, onStatus, species, onSpecies, onReset, count }) {
  const hasFilters = status || species;
  return (
    <div className="filter-row">
      <select className="filter-select" value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="alive">🟢 Alive</option>
        <option value="dead">🔴 Dead</option>
        <option value="unknown">⚫ Unknown</option>
      </select>
      <select className="filter-select" value={species} onChange={(e) => onSpecies(e.target.value)}>
        <option value="">All Species</option>
        {SPECIES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {hasFilters && (
        <button className="filter-reset" onClick={onReset}>✕ Reset</button>
      )}
      {count !== undefined && (
        <span className="results-info">{count} found</span>
      )}
    </div>
  );
}
