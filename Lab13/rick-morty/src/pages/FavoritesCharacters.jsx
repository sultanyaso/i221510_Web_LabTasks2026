import { useFavorites } from "../context/FavoritesContext";
import CharacterCard from "../components/CharacterCard";

export default function FavoritesCharacters({ navigate }) {
  const { favorites, clearAll } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="page">
        <div className="page-title">★ Favorites</div>
        <div className="empty-state">
          <div className="empty-icon">🌌</div>
          <div className="empty-title">No favorites yet</div>
          <div className="empty-sub">Star characters to save them here across sessions.</div>
          <button className="btn-go" onClick={() => navigate("list")}>Browse Characters</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="fav-header">
        <div>
          <div className="page-title">★ Favorites</div>
          <p className="page-sub">{favorites.length} character{favorites.length !== 1 ? "s" : ""} saved</p>
        </div>
        <button className="btn-clear-all" onClick={clearAll}>✕ Clear All</button>
      </div>
      <div className="char-grid">
        {favorites.map((c) => (
          <CharacterCard key={c.id} character={c} onClick={() => navigate("detail", c.id)} />
        ))}
      </div>
    </div>
  );
}
