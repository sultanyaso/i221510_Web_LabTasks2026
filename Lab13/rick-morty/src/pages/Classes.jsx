import { useState, useEffect } from "react";

const SPECIES_META = {
  Human: { icon: "👤", color: "var(--blue)" },
  Alien: { icon: "👽", color: "var(--green)" },
  Humanoid: { icon: "🧬", color: "#b96fff" },
  Robot: { icon: "🤖", color: "var(--yellow)" },
  Animal: { icon: "🐾", color: "#ff9966" },
  Disease: { icon: "🦠", color: "var(--red)" },
  Cronenberg: { icon: "🫀", color: "#ff6688" },
  "Mythological Creature": { icon: "🐉", color: "#ffaa44" },
  "Poopybutthole": { icon: "💛", color: "#ffe566" },
  Unknown: { icon: "❓", color: "var(--muted)" },
};

const SPECIES_LIST = [
  "Human", "Alien", "Humanoid", "Robot", "Animal",
  "Disease", "Cronenberg", "Mythological Creature", "Poopybutthole", "Unknown"
];

export default function Classes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const fetchSpeciesCount = async (species) => {
      const url = `https://rickandmortyapi.com/api/character?species=${encodeURIComponent(species)}`;
      try {
        const r = await fetch(url);
        if (r.status === 404) return { species, count: 0 };
        const d = await r.json();
        return { species, count: d.info?.count || 0 };
      } catch { return { species, count: 0 }; }
    };

    Promise.all(SPECIES_LIST.map(fetchSpeciesCount))
      .then((results) => {
        if (!cancelled) {
          const sorted = results.sort((a, b) => b.count - a.count);
          setData(sorted);
          setTotal(sorted.reduce((acc, r) => acc + r.count, 0));
          setLoading(false);
        }
      })
      .catch((e) => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, []);

  const max = data[0]?.count || 1;

  return (
    <div className="page">
      <div className="page-title">🧬 Species Registry</div>
      <p className="page-sub">Classification of all known life forms across {total}+ recorded characters</p>

      {loading && (
        <div className="loader"><div className="portal-spin" /><div className="loader-text">CLASSIFYING SPECIES…</div></div>
      )}
      {error && (
        <div className="error-box">
          <div className="error-icon">⚠️</div>
          <div className="error-title">Database Error</div>
          <div className="error-sub">{error}</div>
        </div>
      )}
      {!loading && !error && (
        <div className="classes-grid">
          {data.map(({ species, count }) => {
            const meta = SPECIES_META[species] || { icon: "🔬", color: "var(--blue)" };
            const pct = Math.round((count / max) * 100);
            return (
              <div className="class-card" key={species}>
                <div className="class-icon">{meta.icon}</div>
                <div className="class-name" style={{ color: meta.color }}>{species}</div>
                <div className="class-count">{count} characters</div>
                <div className="class-bar-wrap">
                  <div className="class-bar" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}