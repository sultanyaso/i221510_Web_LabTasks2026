# 🛸 Rick & Morty Character Explorer

A full-featured Rick & Morty character explorer using the public API, built with React + Vite.

## Features

- **Character List** — Browse all 800+ characters with pagination
- **Search** — Real-time API search by character name
- **Filters** — Filter by Status (Alive/Dead/Unknown) and Species
- **Sort** — Pagination with smart page controls
- **Character Detail** — Full profile: image, status, species, origin, location, episode list
- **Species Registry** — Visual breakdown of all species with bar charts (live API data)
- **Favorites** — Add/remove favorites with ⭐ — saved to localStorage (persists on refresh)
- **Loading states** — Portal spinner on every API call
- **Error handling** — Graceful 404/network error display
- **Separate useEffects** — Initial fetch and search/filter updates use independent hooks
- **No unnecessary re-renders** — Proper dependency arrays throughout

## How to Run

### Prerequisites
- Node.js 18+ → https://nodejs.org

### Steps

```bash
# 1. Unzip and open a terminal in the rick-morty/ folder

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
rick-morty/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── FavoritesContext.jsx   # localStorage favorites via React Context
    ├── hooks/
    │   ├── useCharacters.js       # Dual useEffect: initial + search/filter
    │   └── useCharacterDetail.js  # Single character fetch
    ├── components/
    │   ├── CharacterCard.jsx
    │   ├── SearchBar.jsx
    │   └── FilterPanel.jsx
    └── pages/
        ├── CharacterList.jsx      # / route
        ├── CharacterDetail.jsx    # /character/:id route
        ├── Classes.jsx            # /classes route (species breakdown)
        └── FavoritesCharacters.jsx # /favorites route
```

## API Used
- https://rickandmortyapi.com/api/character
