// src/pages/Home.jsx
import React from "react";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import Rails from "../../components/Rails/Rails";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

/* ---------------------------------------------------------------
   Dummy movie data (swap with API later)
---------------------------------------------------------------- */
const movies = [
  { id: 1, title: "Inception", poster: "/posters/inception.jpg" },
  { id: 2, title: "Interstellar", poster: "/posters/interstellar.jpg" },
  { id: 3, title: "Oppenheimer", poster: "/posters/oppenheimer.jpg" },
  { id: 4, title: "The Dark Knight", poster: "/posters/dark-knight.jpg" },
  { id: 5, title: "Dunkirk", poster: "/posters/dunkirk.jpg" },
];

/* ---------------------------------------------------------------
   Home page content sections
   (You can reorder, add, or remove at will)
---------------------------------------------------------------- */
const sections = [
  { key: "nowShowing", title: "🎬 Now Showing" },
  { key: "comingSoon", title: "📅 Coming Soon" },
  { key: "offers", title: "🏷️  Offers & Deals" },
  { key: "nearbyCinemas", title: "📍 Cinemas Near You" },
  { key: "trending", title: "🔥 Trending Now" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Slider */}
      <Slider />

      {/* Dynamic Rails */}
      {sections.map(({ key, title }) => (
        <Rails key={key} title={title} movies={movies} />
      ))}

      <Footer />
    </div>
  );
}
