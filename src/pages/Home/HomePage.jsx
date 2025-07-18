
import { useEffect, useState } from "react";
import Home from "./Home";
import { 
  getMoviesUrl, 
  getMovieDetails, 
  POPULAR_URL, 
  TOP_RATED_URL, 
  NOW_PLAYING_URL, 
  UPCOMING_URL, 
  TRENDING_URL 
} from "/src/movieApi.js";

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingPage, setShowBookingPage] = useState(false);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        //movies for hero slider
        const popularMoviesData = await getMoviesUrl(POPULAR_URL);
        const detailedPopularMovies = await Promise.all(
          popularMoviesData.slice(0, 10).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setPopularMovies(detailedPopularMovies);

        const topRatedData = await getMoviesUrl(TOP_RATED_URL);
        const detailedTopRated = await Promise.all(
          topRatedData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setTopRatedMovies(detailedTopRated);

        const nowPlayingData = await getMoviesUrl(NOW_PLAYING_URL);
        const detailedNowPlaying = await Promise.all(
          nowPlayingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setNowPlayingMovies(detailedNowPlaying);

        const upcomingData = await getMoviesUrl(UPCOMING_URL);
        const detailedUpcoming = await Promise.all(
          upcomingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setUpcomingMovies(detailedUpcoming);

        const trendingData = await getMoviesUrl(TRENDING_URL);
        const detailedTrending = await Promise.all(
          trendingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setTrendingMovies(detailedTrending);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);
  
  return (
    <div>
      {loading ? (
        <p style={{ color: "#fff", padding: "1rem" }}>Loading movies...</p>
      ) : (
        <>
            <Home 
              popularMovies={popularMovies}
              topRatedMovies={topRatedMovies}
              nowPlayingMovies={nowPlayingMovies}
              upcomingMovies={upcomingMovies}
              trendingMovies={trendingMovies}
            />
        </>
      )}
    </div>
  );
}

export default HomePage;