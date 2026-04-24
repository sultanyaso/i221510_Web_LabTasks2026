import { useCharacterDetail } from "../hooks/useCharacterDetail";
import { useFavorites } from "../context/FavoritesContext";

const statusClass = (s) => s?.toLowerCase() || "unknown";

export default function CharacterDetail({ id, navigate }) {
  const { character, loading, error } = useCharacterDetail(id);
  const { toggle, isFav } = useFavorites();

  if (loading) return (
    <div className="page">
      <div className="loader"><div className="portal-spin" /><div className="loader-text">LOADING CHARACTER…</div></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div className="error-box">
        <div className="error-icon">⚠️</div>
        <div className="error-title">Character not found</div>
        <div className="error-sub">{error}</div>
        <button className="btn-retry" onClick={() => navigate("list")}>Back to List</button>
      </div>
    </div>
  );

  if (!character) return null;

  const fav = isFav(character.id);
  const epNumbers = character.episode.map((url) => {
    const n = url.split("/").pop();
    return `EP${n.padStart(2, "0")}`;
  });

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("list")}>← Back</button>
      <div className="detail-grid">
        <div className="detail-img-wrap">
          <img className="detail-img" src={character.image} alt={character.name} />
          <button className={`detail-fav-btn ${fav ? "active" : ""}`} onClick={() => toggle(character)}>
            {fav ? "★" : "☆"}
          </button>
        </div>
        <div className="detail-info">
          <div className="detail-name">{character.name}</div>
          <div className="detail-status">
            <span className={`status-dot ${statusClass(character.status)}`} style={{ width: 12, height: 12 }} />
            <span style={{ color: "var(--text)" }}>{character.status}</span>
            <span style={{ color: "var(--text-dim)" }}>·</span>
            <span className="species-tag" style={{ fontSize: "0.85rem", padding: "3px 10px" }}>{character.species}</span>
          </div>
          <div className="detail-stats">
            <div className="stat-block">
              <div className="stat-lbl">Gender</div>
              <div className="stat-val">{character.gender}</div>
            </div>
            <div className="stat-block">
              <div className="stat-lbl">Type</div>
              <div className="stat-val">{character.type || "—"}</div>
            </div>
            <div className="stat-block">
              <div className="stat-lbl">Origin</div>
              <div className="stat-val">{character.origin?.name || "Unknown"}</div>
            </div>
            <div className="stat-block">
              <div className="stat-lbl">Last Known Location</div>
              <div className="stat-val">{character.location?.name || "Unknown"}</div>
            </div>
          </div>
          <div className="episodes-section">
            <div className="episodes-title">📺 Appears in {character.episode.length} episode{character.episode.length !== 1 ? "s" : ""}</div>
            <div className="episodes-list">
              {epNumbers.slice(0, 20).map((ep) => <span key={ep} className="ep-tag">{ep}</span>)}
              {epNumbers.length > 20 && <span className="ep-tag">+{epNumbers.length - 20} more</span>}
            </div>
          </div>
          <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <button
              onClick={() => toggle(character)}
              style={{
                padding: "10px 24px", borderRadius: "40px",
                background: fav ? "rgba(255,229,102,0.12)" : "var(--green-pale)",
                border: `1.5px solid ${fav ? "var(--yellow)" : "var(--green)"}`,
                color: fav ? "var(--yellow)" : "var(--green)",
                fontFamily: "'Exo 2', sans-serif", fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s", fontSize: "0.95rem",
              }}
            >
              {fav ? "★ Remove from Favorites" : "☆ Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
