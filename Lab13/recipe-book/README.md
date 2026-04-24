# 🍳 RecipeBook

A full-featured recipe book app built with React + Vite.

## Features
- Browse 6 curated recipes from 5 cuisines
- Search by name or cuisine
- Filter by cuisine & difficulty
- Sort by rating, prep time, or name
- View detailed recipe with ingredients & step-by-step instructions
- Add/remove recipes to a weekly Meal Plan (saved via localStorage)
- Leave star ratings & comments on recipes
- Vegetarian/Vegan badges
- Cooking time badge on every card
- Print recipe (browser print dialog)
- 1-second simulated loading states
- Fully responsive

## How to Run

### Prerequisites
- Node.js 18 or higher (https://nodejs.org)
- npm (comes with Node.js)

### Steps

1. **Unzip** the downloaded file and open a terminal in the `recipe-book` folder.

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

4. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

That's it! The app is live. 🎉

### Build for Production (optional)
```
npm run build
npm run preview
```

## Project Structure
```
recipe-book/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── recipes.js          # All recipe data
    ├── components/
    │   ├── RecipeCard.jsx
    │   ├── SearchBar.jsx
    │   ├── CuisineFilter.jsx
    │   ├── DifficultyFilter.jsx
    │   └── ReviewForm.jsx
    └── pages/
        ├── Home.jsx
        ├── RecipeList.jsx
        ├── RecipeDetail.jsx
        └── MealPlan.jsx
```
