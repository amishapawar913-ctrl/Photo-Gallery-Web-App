import { memo } from "react";

// memo() skips re-rendering this component when its props have not changed.
// That only works if the onChange prop keeps the same identity, which is why
// Gallery wraps its handler in useCallback.
function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8">
      <label htmlFor="search" className="sr-only">
        Search photos by author
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author name"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:max-w-md"
      />
    </div>
  );
}

export default memo(SearchBar);
