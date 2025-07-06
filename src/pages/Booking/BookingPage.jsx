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

export default function BookingPage() {
  const { title } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const liveInfo = {
    timings: ["09:45 AM", "12:30 PM", "03:15 PM", "06:15 PM"],
    theaters: ["Vaishali Nagar", "Sector 17", "City Cinema"],
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const search_url = await searchMovies(title);
        const MoviesData = await getMoviesUrl(search_url);
        const detailedMovie = await getMovieDetails(MoviesData[0].MOVIE_URL);
        setMovieInfo(detailedMovie);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [title]);

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
            <DateTimeTheater liveInfo={liveInfo} />
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
