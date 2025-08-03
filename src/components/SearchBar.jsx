import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useTheme } from "../Theme-provider";

export function SearchBar({ onSearch }) {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Update query state when input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  // Call onSearch when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="max-w-3xl relative mx-auto w-full">
      {/* search icon */}
      <Search
        className={`absolute text-gray-300 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5`}
      />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${
          theme === "colorful" ? "pacifico-regular" : ""
        } w-full placeholder-gray-500 px-4 pl-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black text-base sm:text-lg`}
      />

      {/* Loading spinner */}
      {query !== debouncedQuery && (
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2`}>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
