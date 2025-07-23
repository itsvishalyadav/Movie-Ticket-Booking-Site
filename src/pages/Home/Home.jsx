// src/pages/Home.jsx
import Header from "../../components/Layout/Header";
import Slider from "../../components/Slider/Slider";
import Rails from "../../components/Rails/Rails";
import Footer from "../../components/Layout/Footer";
import styles from "./Home.module.css";
import { useCity } from "../../contexts/CityContext";
import { useEffect, useState } from "react";


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

export default function Home() {

  const {city} = useCity();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sections , setSections] = useState();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const popularMoviesData = await fetch(`http://localhost:8080/api/movies/${city}/popular`);
        const detailedPopularMovies = await popularMoviesData.json();
        setPopularMovies(detailedPopularMovies);

        const topRatedData = await fetch(`http://localhost:8080/api/movies/${city}/toprated`);
        const detailedTopRated = await topRatedData.json();
        setTopRatedMovies(detailedTopRated);

        const nowPlayingData = await fetch(`http://localhost:8080/api/movies/${city}/nowplaying`);
        const detailedNowPlaying = await nowPlayingData.json();
        setNowPlayingMovies(detailedNowPlaying);

        const upcomingData = await fetch(`http://localhost:8080/api/movies/upcoming`);
        const detailedUpcoming = await upcomingData.json();
        setUpcomingMovies(detailedUpcoming);

        const trendingData = await fetch(`http://localhost:8080/api/movies/${city}/trending`);
        const detailedTrending = await trendingData.json();
        setTrendingMovies(detailedTrending);

        // ✅ Use freshly fetched data here
        const freshSections = getSections(
          detailedNowPlaying,
          detailedUpcoming,
          detailedTopRated,
          detailedTrending
        );
        setSections(freshSections);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [city]);

  
  if (loading) {
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
      <Header nonSticky/>
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
