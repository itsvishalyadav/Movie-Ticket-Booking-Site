import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader/Loader";
import BookingPage from "../Booking/BookingPage";
import MoviePageTexts from "./MoviePageTexts";
import { useParams } from "react-router-dom";

function MoviePage() {
  const { title } = useParams();
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(true);
  let [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const movieData = await fetch(
          ` http://localhost:8080/api/movies/${title}`,
          { credentials: "include" }
        );
        const detailedMovies = await movieData.json();
        const reviewsData = await fetch(
          `http://localhost:8080/api/reviews/${detailedMovies[0]._id}`,
          { credentials: "include" })
        
        const detailedReviews = await reviewsData.json();
        setReviews(detailedReviews);
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
          <MoviePageTexts info={movies[0]} reviews = {reviews} setReviews = {setReviews}/>
        </div>
      )}
    </div>
  );
}

export default MoviePage;
