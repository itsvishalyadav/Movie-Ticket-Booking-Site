// src/components/MovieCard.jsx
import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

/**
 * Displays a single movie poster with an optional rating badge.
 */
function MovieCard({ movie }) {
  if (!movie) return null;

  const { title, poster, ratings, genres, length } = movie;

  return (
    <Link to={`/movie/${title}`}>
      <div className={styles.card}>
        <img src={poster} alt={title} className={styles.poster} />

        {/* Hover overlay with title and rating */}
        <div className={styles.overlay}>
          <p className={styles.title}>{title}</p>
          <span className={styles.rating}>⭐ {ratings.imdbRating.toFixed(1)}</span>
          <p className={styles.genre}>{genres.slice(0, 2).join(", ")}</p>
          <p className={styles.duration}>{length}</p>
        </div>
      </div>
    </Link>
    
  );
}

export default MovieCard;
