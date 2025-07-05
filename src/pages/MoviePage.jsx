import { useEffect, useState } from "react";
import Header from "../components/Header";
import BookingPage from "./BookingPage";
import MoviePageTexts from "./MoviePageTexts";
import AddItemPage from "./AddItemPage";
import { getMoviesUrl, getMovieDetails, POPULAR_URL } from "../movieApi";


function MoviePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingPage, setShowBookingPage] = useState(false);

  useEffect(() => {
    getMoviesUrl(POPULAR_URL)
      .then((movies) => {
        return Promise.all(movies.map((m) => getMovieDetails(m.MOVIE_URL)));
      })
      .then((detailedMovies) => {
        setPopularMovies(detailedMovies);
        setLoading(false);
      });
  }, []);

  const liveInfo = {
    timings: ["09:45 AM", "12:30 PM", "03:15 PM", "06:15 PM"],
    theaters: ["Vaishali Nagar", "Sector 17", "City Cinema"],
  };

  const buildBackgroundStyle = (movie) => {
    const mobileGradient = `linear-gradient(to top, rgba(0,0,0,0.3) 30%, #1a191f 95%), url(${movie.bgImagePhone})`;
    const desktopGradient = `linear-gradient(to left, rgba(0,0,0,0) 5%, #1a191f 70%), url(${movie.bgImage})`;

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
          {popularMovies.length > 0 &&
            (showBookingPage ? (
              <div>
                <Header nonSticky />
                <BookingPage info={popularMovies[17]} liveInfo={liveInfo} />
              </div>
            ) : (
              <div style={buildBackgroundStyle(popularMovies[17])}>
                <Header />
                <MoviePageTexts
                  info={popularMovies[17]}
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

