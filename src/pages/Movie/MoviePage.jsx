import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import BookingPage from "../Booking/BookingPage";
import MoviePageTexts from "./MoviePageTexts";
import {useParams} from "react-router-dom";

function MoviePage() {
  const {title} = useParams();
  let [movies , setMovies] = useState([]);
  let [loading, setLoading] = useState(true);
  let [showBookingPage, setShowBookingPage] = useState(false);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const movieData = await fetch(`http://localhost:8080/api/movies/${title}`);
        const detailedMovies = await movieData.json();
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
    <div>
      {loading ? (
        <p style={{ color: "#fff", padding: "1rem" }}>Loading movies...</p>
      ) : (
        <>
          {movies.length > 0 &&
            (showBookingPage ? (
              <div>
                <Header nonSticky />
                <BookingPage info={movies[0]} liveInfo={liveInfo} />
              </div>
            ) : (
              <div style={buildBackgroundStyle(movies[0])}>
                <Header />
                <MoviePageTexts
                  info={movies[0]}
                  onBookTicket={() => setShowBookingPage(true)}
                />
              </div>
            ))}

          {/* <AddItemPage /> */}
        </>
      )}
    </div>
  );
}

export default MoviePage;