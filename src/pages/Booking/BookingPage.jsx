import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Layout/Header";
import DateTimeTheater from "../../components/Booking/DateTimeTheater";
import MovieInfo from "../../components/MovieInfo/MovieInfoBookingPage";
import SeatPricingInfo from "../../components/Booking/SeatPricingInfo";
import SeatMatrix from "../../components/Booking/SeatMatrix";
import "./BookingPage.css";
import { 
  getMoviesUrl, 
  getMovieDetails, 
  searchMovies
} from "/src/movieApi.js";

export default function BookingPage({ info, liveInfo }) {
  const { title } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState(info || null);
  const [loading, setLoading] = useState(!info);

  const defaultLiveInfo = {
    timings: ["09:45 AM", "12:30 PM", "03:15 PM", "06:15 PM"],
    theaters: ["Vaishali Nagar", "Sector 17", "City Cinema"],
  };

  useEffect(() => {
    if (info) return; 
    const fetchMovieData = async () => {
      try {
        const searchResults = await searchMovies(title);
        if (!searchResults.length) throw new Error("No results");
        const movie = searchResults[0];
        const detailedMovie = await getMovieDetails(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=9eec713ccd6e293c48c3085825d25d7e`
        );
        setMovieInfo(detailedMovie);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [title, info]);

  if (loading) {
    return <p style={{ color: "#fff", padding: "1rem" }}>Loading booking page...</p>;
  }

  if (!movieInfo) {
    return <p style={{ color: "#fff", padding: "1rem" }}>Movie not found</p>;
  }

  return (
    <div>
      <Header nonSticky />
      <div
        style={{
          background: `
            radial-gradient(circle, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%) no-repeat center/cover,
            url(${movieInfo.bgImage}) no-repeat center/cover
          `,
        }}
        id="BookingPage"
      >
        <MovieInfo info={movieInfo} />
        <div className="booking-page-flex-row">
          <div className="date-time-theater">
            <DateTimeTheater liveInfo={liveInfo || defaultLiveInfo} />
          </div>
          <div className="booking-page-center">
            <SeatMatrix
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
          </div>
          <div className="seat-pricing-info">
            <SeatPricingInfo selectedSeats={selectedSeats} />
          </div>
        </div>
      </div>
    </div>
  );
}
