import { useEffect, useState } from "react";
import Home from "./Home";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Loader from "../../components/Loader/Loader";
import { useCity } from "../../contexts/CityContext";

function HomePage() {
  const { city } = useCity();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const popularMoviesData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/${city}/popular`
        );
        const detailedPopularMovies = await popularMoviesData.json();
        setPopularMovies(detailedPopularMovies);

        const topRatedData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/${city}/toprated`
        );
        const detailedTopRated = await topRatedData.json();
        setTopRatedMovies(detailedTopRated);

        const nowPlayingData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/${city}/nowplaying`
        );
        const detailedNowPlaying = await nowPlayingData.json();
        setNowPlayingMovies(detailedNowPlaying);

        const upcomingData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/upcoming`
        );
        const detailedUpcoming = await upcomingData.json();
        setUpcomingMovies(detailedUpcoming);

        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [city]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Home
          popularMovies={popularMovies}
          topRatedMovies={topRatedMovies}
          nowPlayingMovies={nowPlayingMovies}
          upcomingMovies={upcomingMovies}
          
        />
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
