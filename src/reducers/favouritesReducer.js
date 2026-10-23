// Favourites are stored as an array of photo ids, e.g. ["0", "12", "27"].
export const FAVOURITES_KEY = "photo-gallery-favourites";

// Used as useReducer's lazy initializer: runs once on first render and
// restores favourites saved before a page refresh.
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupted JSON or storage not available: start with an empty list.
    return [];
  }
}

// The reducer is a pure function: (currentState, action) => newState.
// It handles one action: TOGGLE_FAVOURITE (add the id if missing, remove it if present).
export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}
