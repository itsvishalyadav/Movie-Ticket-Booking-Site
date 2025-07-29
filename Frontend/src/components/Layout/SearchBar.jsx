import React, { useState } from "react";
import { Search } from "lucide-react";
import SearchResults from "../../pages/Search/SearchResults";
import styles from "./SearchBar.module.css";

export default function SearchBar({ placeholder = "Search movies..." }) {
  const [query, setQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowOverlay(true);
  };

  const handleSearchClose = () => {
    setQuery("");
    setShowOverlay(false);
  };

  return (
    <div>
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder={placeholder}
          className={styles.searchInput}
          value={query}
          onChange={handleSearchChange}
          onFocus={() => query && setShowOverlay(true)}
        />
        {query && (
          <button
            type="button"
            className={styles.searchCancel}
            onClick={handleSearchClose}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </form>

      {showOverlay && (
        <div className={styles.searchOverlay} onClick={handleSearchClose}>
          <div
            className={styles.searchOverlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchResults parameter={query} onClose={handleSearchClose} />
          </div>
        </div>
      )}
    </div>
  );
}
