// src/components/MovieCard.jsx
import React from "react";
import styles from "./MovieCard.module.css";

/**
 * Displays a single movie poster with an optional rating badge.
 * Expects a `movie` object: { id, title, poster, rating? }
 */
function MovieCard({ movie }) {
  if (!movie) return null;

  const { title, poster, rating } = movie;

  return (
    <div className={styles.card}>
      <img src={poster} alt={title} className={styles.poster} />

      {/* Hover overlay with title (and rating if provided) */}
      <div className={styles.overlay}>
        <p className={styles.title}>{title}</p>
        {rating && <span className={styles.rating}>⭐ {rating}</span>}
      </div>
    </div>
  );
}

export default MovieCard;
