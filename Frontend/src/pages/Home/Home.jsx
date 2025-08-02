// src/pages/Home.jsx
import React from "react";
import Slider from "../../components/Slider/Slider";
import Rails from "../../components/Rails/Rails";
import styles from "./Home.module.css";

const getSections = (
  nowPlayingMovies,
  upcomingMovies,
  topRatedMovies,
  
) => [
  { key: "nowShowing", title: "🎬 Now Showing", movies: nowPlayingMovies },
  { key: "comingSoon", title: "📅 Coming Soon", movies: upcomingMovies },
  { key: "topRated", title: "⭐ Top Rated", movies: topRatedMovies },
];

export default function Home({
  popularMovies = [],
  topRatedMovies = [],
  nowPlayingMovies = [],
  upcomingMovies = [],
}) {
  const sections = getSections(
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
  );

  return (
    <div className={styles.page}>
      <Slider movies={popularMovies} />
      {sections.map(({ key, title, movies }) => (
        <Rails key={key} title={title} movies={movies} />
      ))}
    </div>
  );
}