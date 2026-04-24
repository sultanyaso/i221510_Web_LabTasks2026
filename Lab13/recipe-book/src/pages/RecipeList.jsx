import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import CuisineFilter from "../components/CuisineFilter";
import DifficultyFilter from "../components/DifficultyFilter";

export default function RecipeList({ recipes, navigate, addToMealPlan, inMealPlan }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].sort();

  const filtered = recipes
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        (r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)) &&
        (cuisine ? r.cuisine === cuisine : true) &&
        (difficulty ? r.difficulty === difficulty : true)
      );
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "prepTime") return a.prepTime - b.prepTime;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading all recipes…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title" style={{ marginBottom: "1.5rem" }}>All Recipes</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" }}>
        <SearchBar value={search} onChange={setSearch} />
        <div className="filters-row">
          <span className="filter-label">Filter:</span>
          <CuisineFilter cuisines={cuisines} value={cuisine} onChange={setCuisine} />
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
          <span className="filter-label" style={{ marginLeft: "8px" }}>Sort:</span>
          <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rating">⭐ Rating</option>
            <option value="prepTime">⏱ Prep Time</option>
            <option value="name">🔤 Name</option>
          </select>
          <span className="results-count">{filtered.length} recipe{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="meal-plan-empty">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No recipes found</div>
          <div className="empty-sub">Try adjusting your search or filters.</div>
          <button className="btn btn-outline" onClick={() => { setSearch(""); setCuisine(""); setDifficulty(""); }}>Clear Filters</button>
        </div>
      ) : (
        <div className="recipe-grid">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} navigate={navigate} addToMealPlan={addToMealPlan} inMealPlan={inMealPlan} />
          ))}
        </div>
      )}
    </div>
  );
}
