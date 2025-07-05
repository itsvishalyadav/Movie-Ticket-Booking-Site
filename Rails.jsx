// src/components/Rails.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./Rails.module.css";

export default function Rails({ title, movies = [] }) {
  const rowRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* ---------------- helper to update arrow states ---------------- */
  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  /* ---------------- scroll by n cards ---------------- */
  const scrollBy = (dir) => {
    const el = rowRef.current;
    const cardWidth = el?.firstChild?.offsetWidth || 160;
    el?.scrollBy({ left: dir * cardWidth * 3, behavior: "smooth" });
  };

  /* ---------------- run on mount & on scroll ---------------- */
  useEffect(() => updateArrows(), [movies, updateArrows]);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    return () => el.removeEventListener("scroll", updateArrows);
  }, [updateArrows]);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.wrapper}>
        {/* ← Prev */}
        <button
          className={`${styles.nav} ${styles.prev} ${
            atStart ? styles.navDisabled : ""
          }`}
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Row of cards */}
        <div className={styles.row} ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* → Next */}
        <button
          className={`${styles.nav} ${styles.next} ${
            atEnd ? styles.navDisabled : ""
          }`}
          onClick={() => scrollBy(1)}
          aria-label="Next"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </section>
  );
}
