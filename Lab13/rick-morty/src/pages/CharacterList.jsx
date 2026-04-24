import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

function Pagination({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = [];
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);
  if (start > 1) pages.push(1, "...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages) pages.push("...", totalPages);

  return (
    <div className="pagination">
      <button className="page-btn" onClick={() => onPage(page - 1)} disabled={page === 1}>← Prev</button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="page-info">…</span>
        ) : (
          <button key={p} className={`page-btn ${p === page ? "current" : ""}`} onClick={() => onPage(p)}>{p}</button>
        )
      )}
      <button className="page-btn" onClick={() => onPage(page + 1)} disabled={page === totalPages}>Next →</button>
    </div>
  );
}

export default function CharacterList({ navigate }) {
  const {
    characters, info, loading, error,
    page, setPage,
    search, handleSearch,
    status, handleStatus,
    species, handleSpecies,
    resetFilters,
  } = useCharacters();

  return (
    <div className="page">
      <div className="page-title">🛸 Character Database</div>
      <p className="page-sub">Explore {info?.count ?? "…"} characters across the multiverse</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" }}>
        <SearchBar value={search} onChange={handleSearch} />
        <FilterPanel
          status={status} onStatus={handleStatus}
          species={species} onSpecies={handleSpecies}
          onReset={resetFilters}
          count={info?.count}
        />
      </div>

      {loading && (
        <div className="loader">
          <div className="portal-spin" />
          <div className="loader-text">SCANNING DIMENSIONS…</div>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <div className="error-icon">⚠️</div>
          <div className="error-title">Portal malfunction</div>
          <div className="error-sub">{error}</div>
          <button className="btn-retry" onClick={resetFilters}>Reset & Retry</button>
        </div>
      )}

      {!loading && !error && characters.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👽</div>
          <div className="empty-title">No characters found</div>
          <div className="empty-sub">Try a different dimension (search term)</div>
          <button className="btn-go" onClick={resetFilters}>Clear Filters</button>
        </div>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <div className="char-grid">
            {characters.map((c) => (
              <CharacterCard key={c.id} character={c} onClick={() => navigate("detail", c.id)} />
            ))}
          </div>
          <Pagination page={page} totalPages={info?.pages} onPage={setPage} />
        </>
      )}
    </div>
  );
}
