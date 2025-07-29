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
<<<<<<< HEAD
          `http://localhost:8080/api/movies/${city}/popular`
=======
          ` http://localhost:8080/api/movies/${city}/popular`
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
        );
        const detailedPopularMovies = await popularMoviesData.json();
        setPopularMovies(detailedPopularMovies);

        const topRatedData = await fetch(
<<<<<<< HEAD
          `http://localhost:8080/api/movies/${city}/toprated`
=======
          ` http://localhost:8080/api/movies/${city}/toprated`
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
        );
        const detailedTopRated = await topRatedData.json();
        setTopRatedMovies(detailedTopRated);

        const nowPlayingData = await fetch(
<<<<<<< HEAD
          `http://localhost:8080/api/movies/${city}/nowplaying`
=======
          ` http://localhost:8080/api/movies/${city}/nowplaying`
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
        );
        const detailedNowPlaying = await nowPlayingData.json();
        setNowPlayingMovies(detailedNowPlaying);

        const upcomingData = await fetch(
<<<<<<< HEAD
          `http://localhost:8080/api/movies/upcoming`
=======
          ` http://localhost:8080/api/movies/upcoming`
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
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
