import { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";

export default function RecipeDetail({ recipes, recipeId, navigate, addToMealPlan, removeFromMealPlan, inMealPlan, addReview }) {
  const [loading, setLoading] = useState(true);
  const recipe = recipes.find((r) => r.id === recipeId);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, [recipeId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading recipe…</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="meal-plan-empty">
        <div className="empty-icon">😕</div>
        <div className="empty-title">Recipe not found</div>
        <button className="btn btn-primary" onClick={() => navigate("recipes")}>Back to Recipes</button>
      </div>
    );
  }

  const added = inMealPlan(recipe.id);

  const handlePrint = () => {
    window.print();
  };

  const avgRating = recipe.reviews.length
    ? (recipe.reviews.reduce((a, r) => a + r.rating, 0) / recipe.reviews.length).toFixed(1)
    : recipe.rating;

  return (
    <div>
      <button className="detail-back" onClick={() => navigate("recipes")}>← Back to Recipes</button>

      <div className="detail-hero">
        <img
          className="detail-img"
          src={recipe.image}
          alt={recipe.name}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=300&fit=crop"; }}
        />
        <div className="detail-info">
          <div className="detail-cuisine">{recipe.cuisine}</div>
          <div className="detail-title">{recipe.name}</div>
          <div className="detail-desc">{recipe.description}</div>
          <div className="detail-badges">
            <span className={`meta-badge ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
            <span className="meta-badge">⏱ {recipe.prepTime} min</span>
            <span className="meta-badge"><span className="star">★</span> {avgRating} ({recipe.reviews.length} reviews)</span>
            {recipe.vegetarian && !recipe.vegan && <span className="meta-badge veg">🥦 Vegetarian</span>}
            {recipe.vegan && <span className="meta-badge vegan">🌱 Vegan</span>}
          </div>
          <div className="detail-actions">
            {added ? (
              <button className="btn btn-danger" onClick={() => removeFromMealPlan(recipe.id)}>Remove from Meal Plan</button>
            ) : (
              <button className="btn btn-primary" onClick={() => addToMealPlan(recipe)}>+ Add to Meal Plan</button>
            )}
            <button className="btn btn-outline" onClick={handlePrint}>🖨 Print Recipe</button>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="ingredients-card">
          <div className="card-title">🧂 Ingredients</div>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}><span className="ing-dot" />{ing}</li>
            ))}
          </ul>
        </div>
        <div className="instructions-card">
          <div className="card-title">👨‍🍳 Instructions</div>
          <ol className="instructions-list">
            {recipe.instructions.map((step, i) => (
              <li key={i}><span className="step-num">{i + 1}</span><span>{step}</span></li>
            ))}
          </ol>
        </div>
      </div>

      <div className="reviews-card">
        <div className="card-title">💬 Reviews</div>
        <div className="reviews-list">
          {recipe.reviews.length === 0 && <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No reviews yet. Be the first!</p>}
          {recipe.reviews.map((rev) => (
            <div key={rev.id} className="review-item">
              <div className="review-header">
                <span className="review-user">{rev.user}</span>
                <span className="review-rating">{"★".repeat(Math.round(rev.rating))} {rev.rating}</span>
              </div>
              <div className="review-comment">{rev.comment}</div>
            </div>
          ))}
        </div>
        <ReviewForm recipeId={recipe.id} addReview={addReview} />
      </div>
    </div>
  );
}
