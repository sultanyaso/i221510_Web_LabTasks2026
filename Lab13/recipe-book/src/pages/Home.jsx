import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home({ recipes, navigate, addToMealPlan, inMealPlan }) {
  const [loading, setLoading] = useState(true);
  const featured = recipes.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].length;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading delicious recipes…</p>
      </div>
    );
  }

  return (
    <div>
      <section className="hero">
        <div className="hero-eyebrow">Welcome to RecipeBook</div>
        <h1>Cook Something<br /><em>Extraordinary</em> Today</h1>
        <p>Discover handcrafted recipes from around the world — plan your meals, save your favourites, and cook with confidence.</p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-large" onClick={() => navigate("recipes")}>Browse Recipes</button>
          <button className="btn btn-outline btn-large" onClick={() => navigate("meal-plan")}>My Meal Plan</button>
        </div>
      </section>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">{recipes.length}</div><div className="stat-lbl">Recipes</div></div>
        <div className="stat-card"><div className="stat-num">{cuisines}</div><div className="stat-lbl">Cuisines</div></div>
        <div className="stat-card"><div className="stat-num">{recipes.filter(r => r.vegetarian).length}</div><div className="stat-lbl">Vegetarian</div></div>
        <div className="stat-card"><div className="stat-num">{Math.round(recipes.reduce((a,r) => a+r.rating,0)/recipes.length*10)/10}</div><div className="stat-lbl">Avg Rating</div></div>
      </div>

      <div className="section-header">
        <h2 className="section-title">⭐ Top Rated</h2>
        <button className="link-btn" onClick={() => navigate("recipes")}>View all →</button>
      </div>
      <div className="recipe-grid">
        {featured.map((r) => (
          <RecipeCard key={r.id} recipe={r} navigate={navigate} addToMealPlan={addToMealPlan} inMealPlan={inMealPlan} />
        ))}
      </div>
    </div>
  );
}
