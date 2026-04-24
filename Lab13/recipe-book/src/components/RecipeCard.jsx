export default function RecipeCard({ recipe, navigate, addToMealPlan, inMealPlan }) {
  const added = inMealPlan(recipe.id);
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        onClick={() => navigate("recipe-detail", recipe.id)}
        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=300&fit=crop"; }}
      />
      <div className="card-body" onClick={() => navigate("recipe-detail", recipe.id)}>
        <div className="card-cuisine">{recipe.cuisine}</div>
        <div className="card-name">{recipe.name}</div>
        <div className="card-desc">{recipe.description}</div>
        <div className="card-meta">
          <span className={`meta-badge ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
          <span className="meta-badge">⏱ {recipe.prepTime} min</span>
          {recipe.vegetarian && !recipe.vegan && <span className="meta-badge veg">🥦 Vegetarian</span>}
          {recipe.vegan && <span className="meta-badge vegan">🌱 Vegan</span>}
          <span className="card-rating"><span className="star">★</span>{recipe.rating}</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary btn-sm" onClick={() => navigate("recipe-detail", recipe.id)}>View Recipe</button>
        <button
          className={`btn btn-sm ${added ? "btn-outline added" : "btn-outline"}`}
          onClick={() => !added && addToMealPlan(recipe)}
        >
          {added ? "✓ In Plan" : "+ Meal Plan"}
        </button>
      </div>
    </div>
  );
}
