import React, { useState } from "react";
import { Search } from "lucide-react";
// import { searchMovies } from "../../movieApi";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSelectMovie, placeholder = "Search movies..." }) {
  // const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);
  // const [showResults, setShowResults] = useState(false);

  // React.useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (query) {
  //       searchMovies(query).then(setResults);
  //     } else {
  //       setResults([]);
  //     }
  //   }, 400);
  //   return () => clearTimeout(handler);
  // }, [query]);

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
        // onChange={e => {
        //   setQuery(e.target.value);
        //   setShowResults(true);
        // }}
        // onBlur={() => setTimeout(() => setShowResults(false), 200)}
        // onFocus={() => query && setShowResults(true)}
      />
      {showResults && results.length > 0 && (
        <div className={styles.searchResults}>
          {results.map(movie => (
            <div
              key={movie.id}
              className={styles.searchResultItem}
              // onMouseDown={() => {
              //   onSelectMovie && onSelectMovie(movie);
              //   setShowResults(false);
              //   setQuery("");
              // }}
            >
              {/* {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.resultPoster}
                />
              )}
              <span>{movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}</span> */}
            </div>
          ))}
        </div>
      )}
    </form>
  );
} 