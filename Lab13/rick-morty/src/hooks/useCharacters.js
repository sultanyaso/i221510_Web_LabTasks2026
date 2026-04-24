import { useState, useEffect, useCallback } from "react";

const BASE = "https://rickandmortyapi.com/api/character";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  // Initial data fetch on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${BASE}?page=1`)
      .then((r) => { if (!r.ok) throw new Error("API error"); return r.json(); })
      .then((data) => {
        if (!cancelled) {
          setCharacters(data.results);
          setInfo(data.info);
          setLoading(false);
        }
      })
      .catch((e) => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // Search/filter/page updates — separate useEffect
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ page });
    if (search) params.set("name", search);
    if (status) params.set("status", status);
    if (species) params.set("species", species);

    fetch(`${BASE}?${params}`)
      .then((r) => {
        if (r.status === 404) return { results: [], info: { count: 0, pages: 0 } };
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) {
          setCharacters(data.results || []);
          setInfo(data.info || { count: 0, pages: 0 });
          setLoading(false);
        }
      })
      .catch((e) => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [page, search, status, species]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setStatus("");
    setSpecies("");
    setPage(1);
  }, []);

  const handleSearch = useCallback((val) => { setSearch(val); setPage(1); }, []);
  const handleStatus = useCallback((val) => { setStatus(val); setPage(1); }, []);
  const handleSpecies = useCallback((val) => { setSpecies(val); setPage(1); }, []);

  return {
    characters, info, loading, error,
    page, setPage,
    search, handleSearch,
    status, handleStatus,
    species, handleSpecies,
    resetFilters,
  };
}
