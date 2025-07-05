import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import BookingPage from "./pages/Booking/BookingPage";
import MoviePageTexts from "./pages/Movie/MoviePageTexts";
import AddItemPage from "./pages/Admin/AddItemPage";
import Home from "./pages/Home/Home";
import { 
  getMoviesUrl, 
  getMovieDetails, 
  POPULAR_URL, 
  TOP_RATED_URL, 
  NOW_PLAYING_URL, 
  UPCOMING_URL, 
  TRENDING_URL 
} from "./movieApi";

function App() {
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

            <Home 
              popularMovies={popularMovies}
              topRatedMovies={topRatedMovies}
              nowPlayingMovies={nowPlayingMovies}
              upcomingMovies={upcomingMovies}
              trendingMovies={trendingMovies}
            />

          {/* <AddItemPage /> */}
        </>
      )}
    </div>
  );
}

export default App;
