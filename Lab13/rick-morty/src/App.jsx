import { useState } from "react";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import Classes from "./pages/Classes";
import FavoritesCharacters from "./pages/FavoritesCharacters";

function NavBar({ page, navigate }) {
  const { favorites } = useFavorites();
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("list")}>
        <span>🛸</span> RICK&amp;MORTY
      </div>
      <div className="nav-links">
        <button className={`nav-btn ${page === "list" ? "active" : ""}`} onClick={() => navigate("list")}>Characters</button>
        <button className={`nav-btn ${page === "classes" ? "active" : ""}`} onClick={() => navigate("classes")}>Species</button>
        <button className={`nav-btn ${page === "favorites" ? "active" : ""}`} onClick={() => navigate("favorites")}>
          Favorites
          {favorites.length > 0 && <span className="nav-badge">{favorites.length}</span>}
        </button>
      </div>
    </nav>
  );
}

function AppInner() {
  const [page, setPage] = useState("list");
  const [detailId, setDetailId] = useState(null);

  const navigate = (p, id = null) => {
    setPage(p);
    if (id !== null) setDetailId(id);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar page={page} navigate={navigate} />
      <main style={{ flex: 1 }}>
        {page === "list" && <CharacterList navigate={navigate} />}
        {page === "detail" && <CharacterDetail id={detailId} navigate={navigate} />}
        {page === "classes" && <Classes />}
        {page === "favorites" && <FavoritesCharacters navigate={navigate} />}
      </main>
      <footer style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-dim)", fontSize: "0.75rem", borderTop: "1px solid var(--border)", fontFamily: "'Orbitron', monospace", letterSpacing: "0.08em" }}>
        RICK &amp; MORTY EXPLORER · POWERED BY RICKANDMORTYAPI.COM
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <AppInner />
    </FavoritesProvider>
  );
}
