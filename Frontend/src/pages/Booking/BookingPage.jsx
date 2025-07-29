import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfoBookingPage";
import SeatMatrix from "../../components/Booking/SeatMatrix";
import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/userContext";
import "./BookingPage.css";

export default function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { title, showId } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/${title}`
        );
        const detailedMovie = await movieData.json();
        setMovieInfo(detailedMovie[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };
    fetchMovieData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!movieInfo) {
    return <p style={{ color: "#fff", padding: "1rem" }}>Movie not found</p>;
  }

  return (
    <div>
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
          <div className="booking-page-center">
            <SeatMatrix
              showId={showId}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              movieInfo={movieInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
