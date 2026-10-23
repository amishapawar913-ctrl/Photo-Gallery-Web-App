import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import {
  favouritesReducer,
  loadFavourites,
  FAVOURITES_KEY,
} from "../reducers/favouritesReducer.js";
import SearchBar from "./SearchBar.jsx";
import PhotoCard from "./PhotoCard.jsx";
import Spinner from "./Spinner.jsx";

export default function Gallery() {
  // 1. Data comes from the custom hook. The Gallery never calls fetch directly.
  const { photos, loading, error } = useFetchPhotos();

  // 2. The text typed into the search box.
  const [query, setQuery] = useState("");

  // 3. Favourites are managed with useReducer (not useState).
  //    The third argument is a lazy initializer that reads localStorage once.
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

  // Save favourites every time they change, so they survive a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch {
      // Storage can be full or blocked (private mode). The app still works without saving.
    }
  }, [favourites]);

  // 4. useCallback: keeps the SAME function between renders (empty dependency list,
  //    because it only uses setQuery, which React guarantees never changes).
  //    SearchBar is wrapped in memo(), so a stable handler stops it re-rendering
  //    every time something unrelated (like toggling a favourite) changes.
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  // 5. useMemo: the filtered list is only recalculated when photos or query change,
  //    not on every render. It filters the already-fetched data, with no API call.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, query]);

  const handleToggleFavourite = (id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: id });
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Could not load photos.</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section>
      <SearchBar value={query} onChange={handleSearch} />

      {filteredPhotos.length === 0 ? (
        <p className="text-slate-600">No photos match your search.</p>
      ) : (
        // Mobile: 1 column. Tablet (md, 768px+): 2 columns. Desktop (lg, 1024px+): 4 columns.
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
