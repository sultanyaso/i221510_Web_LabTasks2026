import { useFavorites } from "../context/FavoritesContext";

const statusClass = (s) => s?.toLowerCase() || "unknown";

export default function CharacterCard({ character, onClick }) {
  const { toggle, isFav } = useFavorites();
  const fav = isFav(character.id);

  return (
    <div className="char-card" style={{ animationDelay: `${Math.random() * 0.2}s` }}>
      <button
        className={`fav-btn ${fav ? "active" : ""}`}
        onClick={(e) => { e.stopPropagation(); toggle(character); }}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? "★" : "☆"}
      </button>
      <img
        className="char-card-img"
        src={character.image}
        alt={character.name}
        loading="lazy"
        onClick={onClick}
      />
      <div className="char-card-body" onClick={onClick}>
        <div className="char-card-name" title={character.name}>{character.name}</div>
        <div className="char-card-meta">
          <span className={`status-dot ${statusClass(character.status)}`} />
          <span className="status-label">{character.status}</span>
          <span className="species-tag">{character.species}</span>
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          📍 {character.location?.name?.length > 22
            ? character.location.name.slice(0, 22) + "…"
            : character.location?.name || "Unknown"}
        </div>
      </div>
    </div>
  );
}
