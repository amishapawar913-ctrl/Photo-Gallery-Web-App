import { useEffect, useState } from "react";

const API_URL = "https://picsum.photos/v2/list?limit=30";

// Custom hook: owns ALL the data-fetching logic so the UI components stay simple.
// Returns exactly what the brief asks for: { photos, loading, error }.
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController lets us cancel the request if the component unmounts
    // (React StrictMode mounts twice in development, so this also avoids a double update).
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          // fetch only rejects on network failure, so a 404/500 must be turned into an error by hand.
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name === "AbortError") return; // cancelled on purpose, not a real error
        setError(err.message || "Something went wrong while loading photos.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
