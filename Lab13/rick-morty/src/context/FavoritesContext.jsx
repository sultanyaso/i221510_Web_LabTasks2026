import { createContext, useContext, useState, useCallback } from "react";

const FavCtx = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rm_favorites") || "[]"); }
    catch { return []; }
  });

  const save = (favs) => {
    setFavorites(favs);
    localStorage.setItem("rm_favorites", JSON.stringify(favs));
  };

  const toggle = useCallback((char) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === char.id);
      const next = exists ? prev.filter((f) => f.id !== char.id) : [...prev, char];
      localStorage.setItem("rm_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFav = useCallback((id) => favorites.some((f) => f.id === id), [favorites]);

  const clearAll = useCallback(() => save([]), []);

  return (
    <FavCtx.Provider value={{ favorites, toggle, isFav, clearAll }}>
      {children}
    </FavCtx.Provider>
  );
}

export const useFavorites = () => useContext(FavCtx);
