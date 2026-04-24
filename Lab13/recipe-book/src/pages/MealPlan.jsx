export default function MealPlan({ mealPlan, navigate, removeFromMealPlan }) {
  const totalTime = mealPlan.reduce((a, r) => a + r.prepTime, 0);
  const cuisines = [...new Set(mealPlan.map((r) => r.cuisine))].length;

  if (mealPlan.length === 0) {
    return (
      <div className="meal-plan-empty">
        <div className="empty-icon">📋</div>
        <div className="empty-title">Your meal plan is empty</div>
        <div className="empty-sub">Add recipes from the recipe list to build your weekly plan.</div>
        <button className="btn btn-primary btn-large" onClick={() => navigate("recipes")}>Browse Recipes</button>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">📋 My Meal Plan</h1>
        <span className="print-hint">🖨 Use Ctrl+P to print your plan</span>
      </div>

      <div className="plan-summary">
        <div className="summary-item">
          <div className="summary-num">{mealPlan.length}</div>
          <div className="summary-lbl">Recipes</div>
        </div>
        <div className="summary-item">
          <div className="summary-num">{totalTime}</div>
          <div className="summary-lbl">Total Minutes</div>
        </div>
        <div className="summary-item">
          <div className="summary-num">{cuisines}</div>
          <div className="summary-lbl">Cuisines</div>
        </div>
        <div className="summary-item">
          <div className="summary-num">{mealPlan.filter(r => r.vegetarian).length}</div>
          <div className="summary-lbl">Vegetarian</div>
        </div>
      </div>

      <div className="meal-plan-grid">
        {mealPlan.map((recipe) => (
          <div key={recipe.id} className="meal-plan-card">
            <img
              src={recipe.image}
              alt={recipe.name}
              onClick={() => navigate("recipe-detail", recipe.id)}
              style={{ cursor: "pointer" }}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=300&fit=crop"; }}
            />
            <div className="meal-card-body">
              <div className="meal-card-name" onClick={() => navigate("recipe-detail", recipe.id)} style={{ cursor: "pointer" }}>{recipe.name}</div>
              <div className="meal-card-meta">{recipe.cuisine} · ⏱ {recipe.prepTime} min · ⭐ {recipe.rating}</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button className="btn btn-outline btn-sm" onClick={() => navigate("recipe-detail", recipe.id)}>View</button>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromMealPlan(recipe.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
