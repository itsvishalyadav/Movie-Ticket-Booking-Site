// src/pages/Home.jsx
import React from "react";
import Header from "../../components/Layout/Header";
import Slider from "../../components/Slider/Slider";
import Rails from "../../components/Rails/Rails";
import Footer from "../../components/Layout/Footer";
import styles from "./Home.module.css";

/* ---------------------------------------------------------------
   Dummy movie data (swap with API later)
---------------------------------------------------------------- */
// const movies = [
//   { id: 1, title: "Inception", poster: "/posters/inception.jpg" },
//   { id: 2, title: "Interstellar", poster: "/posters/interstellar.jpg" },
//   { id: 3, title: "Oppenheimer", poster: "/posters/oppenheimer.jpg" },
//   { id: 4, title: "The Dark Knight", poster: "/posters/dark-knight.jpg" },
//   { id: 5, title: "Dunkirk", poster: "/posters/dunkirk.jpg" },
// ];

/* ---------------------------------------------------------------
   Home page content sections
   (You can reorder, add, or remove at will)
---------------------------------------------------------------- */

// const sections = [
//   { key: "nowShowing", title: "🎬 Now Showing" },
//   { key: "comingSoon", title: "📅 Coming Soon" },
//   { key: "offers", title: "🏷️  Offers & Deals" },
//   { key: "nearbyCinemas", title: "📍 Cinemas Near You" },
//   { key: "trending", title: "🔥 Trending Now" },
// ];
const getSections = (
  nowPlayingMovies,
  upcomingMovies,
  topRatedMovies,
  trendingMovies
) => [
  { key: "nowShowing", title: "🎬 Now Showing", movies: nowPlayingMovies },
  { key: "comingSoon", title: "📅 Coming Soon", movies: upcomingMovies },
  { key: "topRated", title: "⭐ Top Rated", movies: topRatedMovies },
  { key: "trending", title: "🔥 Trending Now", movies: trendingMovies },
];

export default function Home({
  popularMovies = [],
  topRatedMovies = [],
  nowPlayingMovies = [],
  upcomingMovies = [],
  trendingMovies = [],
}) {
  const sections = getSections(
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    trendingMovies
  );

  // Show loading state if no movies are loaded yet
  const isLoading = popularMovies.length === 0 && topRatedMovies.length === 0;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          Loading movies...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Slider */}
      <Slider movies={popularMovies} />

      {/* Dynamic Rails */}
      {sections.map(({ key, title, movies }) => (
        <Rails key={key} title={title} movies={movies} />
      ))}

      <Footer />
    </div>
  );
}
