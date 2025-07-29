import React, { useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ placeholder = "Search movies..." }) {


  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={e => e.preventDefault()}
      autoComplete="off"
    >
      <Search size={18} className={styles.searchIcon} />
      <input
        type="search"
        placeholder={placeholder}
        className={styles.searchInput}
        value={query}
      />
      {showResults && results.length > 0 && (
        <div className={styles.searchResults}>
          {results.map(movie => (
            <div
              key={movie.id}
              className={styles.searchResultItem}
            >
            </div>
          ))}
        </div>
      )}
    </form>
  );
} 