import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import BookingPage from "./pages/Booking/BookingPage";
import MoviePageTexts from "./pages/Movie/MoviePageTexts";
import AddItemPage from "./pages/Admin/AddItemPage";
import Home from "./pages/Home/Home";
import { getMoviesUrl, getMovieDetails, POPULAR_URL } from "./movieApi";

function App() {
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
          {/* {popularMovies.length > 0 &&
            (showBookingPage ? (
              <div>
                <Header nonSticky />
                <BookingPage info={popularMovies[0]} liveInfo={liveInfo} />
              </div>
            ) : (
              <div style={buildBackgroundStyle(popularMovies[0])}>
                <Header />
                <MoviePageTexts
                  info={popularMovies[0]}
                  onBookTicket={() => setShowBookingPage(true)}
                />
              </div>
            ))} */}

            <Home/>

          {/* <AddItemPage /> */}
        </>
      )}
    </div>
  );
}

export default App;
