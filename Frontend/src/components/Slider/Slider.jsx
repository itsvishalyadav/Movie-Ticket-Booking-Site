import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // yarn add lucide-react
import styles from "./Slider.module.css";
import {Link} from "react-router-dom";


export default function Slider({ movies = [], autoPlay = true, delay = 5000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const slides = movies.map(movie => ({
    id: movie.id,
    image: movie.bgImage,
    title: movie.title,
    trailer: movie.trailer,
    rating: movie.ratings.imdbRating.toFixed(1),
    genre: movie.genres.slice(0, 3).join(", "),
    duration: movie.length,
  }));



  /* -------------------------------------------------- helpers */
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    []
  );

  /* -------------------------------------------------- autoplay */
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setTimeout(next, delay);
    return () => clearTimeout(timerRef.current);
  }, [index, autoPlay, delay, next]);

  /* -------------------------------------------------- keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  /* -------------------------------------------------- touch / swipe */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prev();
    if (dx < -50) next();
    touchStartX.current = null;
  };

  /* -------------------------------------------------- render */
  return (
    <div
      className={styles.slider}
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={() =>
        autoPlay && (timerRef.current = setTimeout(next, delay))
      }
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, i) => (
        <Link to={`/movie/${s.title}`}>
          <div
            key={s.id}
            className={`${styles.slide} ${i === index ? styles.active : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== index}
          >
            <div className={styles.overlay}>
              <div className={styles.info}>
                <h2 className={styles.title}>{slides[index].title}</h2>
                <p className={styles.meta}>
                  ⭐ {slides[index].rating} &nbsp;|&nbsp; {slides[index].genre}{" "}
                  &nbsp;|&nbsp; {slides[index].duration}
                </p>
                <button className={styles.bookNow}>Book Now</button>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* arrows */}
      <button
        onClick={prev}
        className={styles.controlLeft}
        aria-label="Previous slide"
      >
        <ChevronLeft size={34} />
      </button>
      <button
        onClick={next}
        className={styles.controlRight}
        aria-label="Next slide"
      >
        <ChevronRight size={34} />
      </button>

      {/* dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
