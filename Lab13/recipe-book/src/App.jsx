import { useState, useEffect } from "react";
import { recipesData } from "./data/recipes";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import MealPlan from "./pages/MealPlan";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [recipes, setRecipes] = useState(recipesData);
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mealPlan") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const navigate = (p, id = null) => {
    setPage(p);
    if (id) setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const addToMealPlan = (recipe) => {
    if (!mealPlan.find((r) => r.id === recipe.id)) {
      setMealPlan((prev) => [...prev, recipe]);
    }
  };

  const removeFromMealPlan = (id) => {
    setMealPlan((prev) => prev.filter((r) => r.id !== id));
  };

  const addReview = (recipeId, review) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId
          ? {
              ...r,
              reviews: [...r.reviews, { ...review, id: Date.now() }],
              rating: parseFloat(
                (
                  ([...r.reviews, review].reduce((a, b) => a + b.rating, 0)) /
                  (r.reviews.length + 1)
                ).toFixed(1)
              ),
            }
          : r
      )
    );
  };

  const inMealPlan = (id) => mealPlan.some((r) => r.id === id);

  const props = { recipes, mealPlan, navigate, addToMealPlan, removeFromMealPlan, addReview, inMealPlan };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("home")}>
          <span className="brand-icon">🍳</span>
          <span className="brand-text">RecipeBook</span>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => navigate("home")}>Home</button>
          <button className={`nav-link ${page === "recipes" ? "active" : ""}`} onClick={() => navigate("recipes")}>Recipes</button>
          <button className={`nav-link ${page === "meal-plan" ? "active" : ""}`} onClick={() => navigate("meal-plan")}>
            Meal Plan
            {mealPlan.length > 0 && <span className="badge">{mealPlan.length}</span>}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {page === "home" && <Home {...props} />}
        {page === "recipes" && <RecipeList {...props} />}
        {page === "recipe-detail" && <RecipeDetail {...props} recipeId={selectedId} />}
        {page === "meal-plan" && <MealPlan {...props} />}
      </main>

      <footer className="footer">
        <p>🍴 RecipeBook — Discover, Cook, Enjoy</p>
      </footer>
    </div>
  );
}
