# Photo Gallery

A small React + Vite + Tailwind CSS app that fetches 30 photos from the Picsum API and shows them in a responsive grid.

## Features (the 7 requirements, nothing extra)
1. React + Vite project, styled only with Tailwind CSS (no UI libraries)
2. Fetches `https://picsum.photos/v2/list?limit=30` with a loading spinner and an error message
3. Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile; each card shows the photo, author name and a heart button
4. Real-time search by author (filters the already-fetched data, no extra API call)
5. Favourites managed with `useReducer` and saved in `localStorage`, so they survive a refresh
6. Custom hook `useFetchPhotos` returning `{ photos, loading, error }`; `Gallery` uses it instead of calling `fetch`
7. `useCallback` on the search handler and `useMemo` for the filtered list

## Run it
```
npm install
npm run dev
```
Then open the local address shown in the terminal.

## Structure
```
src/
  hooks/useFetchPhotos.js          custom data-fetching hook
  reducers/favouritesReducer.js    reducer and localStorage loader
  components/Gallery.jsx           ties everything together
  components/SearchBar.jsx         search input
  components/PhotoCard.jsx         photo, author, heart button
  components/Spinner.jsx           loading spinner
```
