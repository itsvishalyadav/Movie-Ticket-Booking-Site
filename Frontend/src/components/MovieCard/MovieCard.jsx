// src/components/MovieCard.jsx
import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  if (!movie) return null;

  const { title, poster, ratings, genres, length } = movie;

  const imdbRating =
    ratings && typeof ratings.imdbRating === "number"
      ? ratings.imdbRating
      : null;

  return (
    <Link to={`/movie/${title}`}>
      <div className={styles.card}>
        <img src={poster} alt={title} className={styles.poster} />

        {/* Hover overlay with title and rating */}
        <div className={styles.overlay}>
          <p className={styles.title}>{title}</p>
          <span className={styles.rating}>
            {imdbRating !== null ? `⭐ ${imdbRating.toFixed(1)}` : "No rating"}
          </span>
          <p className={styles.genre}>{genres.slice(0, 2).join(", ")}</p>
          <p className={styles.duration}>{length}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
