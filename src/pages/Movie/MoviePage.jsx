import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader/Loader";
import BookingPage from "../Booking/BookingPage";
import MoviePageTexts from "./MoviePageTexts";
import { useParams } from "react-router-dom";

import {
  getMoviesUrl,
  getMovieDetails,
  POPULAR_URL,
  TOP_RATED_URL,
  NOW_PLAYING_URL,
  UPCOMING_URL,
  TRENDING_URL,
  searchMovies,
} from "/src/movieApi.js";

function MoviePage() {
  const { title } = useParams();
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const searchResults = await searchMovies(title);
        const MoviesData = searchResults.map((movie) => ({
          id: movie.id,
          MOVIE_URL: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=9eec713ccd6e293c48c3085825d25d7e`,
        }));
        const detailedMovies = await Promise.all(
          MoviesData.slice(0, 10).map((m) => getMovieDetails(m.MOVIE_URL))
        );
        setMovies(detailedMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const buildBackgroundStyle = (movie) => {
    const mobileGradient = `linear-gradient(to top, rgba(0,0,0,0.3) 30%, #1a191f 95%), url(${movie.bgImagePhone})`;
    const desktopGradient = `linear-gradient(
        to left,
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,0.2) 30%,
        rgba(0,0,0,0.7) 50%,
        rgba(0,0,0,0.9) 70%,
        #1a191f 100%
      ), url(${movie.bgImage})`;

    return {
      minHeight: "100vh",
      width: "100vw",

      background: window.innerWidth <= 600 ? mobileGradient : desktopGradient,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      position: "relative",
    };
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {loading ? (
        <>
          <Header nonSticky />
          <Loader />
        </>
      ) : (
        <div style={buildBackgroundStyle(movies[0])}>
          <Header nonSticky />
          <MoviePageTexts info={movies[0]} />
        </div>
      )}
    </div>
  );
}

export default MoviePage;
