import { useState, useEffect } from "react";

export function useCharacterDetail(id) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setCharacter(null);

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((r) => { if (!r.ok) throw new Error("Character not found"); return r.json(); })
      .then((data) => { if (!cancelled) { setCharacter(data); setLoading(false); } })
      .catch((e) => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [id]);

  return { character, loading, error };
}
