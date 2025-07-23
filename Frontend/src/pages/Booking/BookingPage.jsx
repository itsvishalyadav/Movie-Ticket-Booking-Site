import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Loader/Loader";
import DateTimeTheater from "../../components/Booking/DateTimeTheater";
import MovieInfo from "../../components/MovieInfo/MovieInfoBookingPage";
import SeatMatrix from "../../components/Booking/SeatMatrix";
import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/userContext";
import "./BookingPage.css";

function formatCurrentDate() {
  const now = new Date();

  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return `${day}, ${monthDay}`;
}

function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}.${minutes} ${ampm}`;
}

export default function BookingPage() {
  const { title } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { city } = useCity();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveInfo, setLiveInfo] = useState({
    theatres: [],
    theatre: "",
    timings: [],
    date: formatCurrentDate(),
    time: "",
  });

  useEffect(() => {
    const fetchShowData = async () => {
      const theatreData = await fetch(
        `https://getmyseatbackend.onrender.com/api/shows/${city}/${title}/${liveInfo.date}`
      );
      const theatres = await theatreData.json();
      console.log(city);
      theatres.length > 0
        ? setLiveInfo((curr) => {
            return {
              ...curr,
              theatres: theatres,
              theatre: theatres[0].name,
              timings: theatres[0].timings.map((time) => formatTime(time.time)),
              time: theatres[0].timings.map((time) => formatTime(time.time))[0],
            };
          })
        : setLiveInfo({
            theatres: [],
            theatre: "",
            timings: [],
            date: formatCurrentDate(),
            time: "",
          });
    };
    fetchShowData();
  }, [title, city, liveInfo.date]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await fetch(
          `https://getmyseatbackend.onrender.com/api/movies/${title}`
        );
        const detailedMovie = await movieData.json();
        console.log(detailedMovie);
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
            <DateTimeTheater liveInfo={liveInfo} setLiveInfo={setLiveInfo} />
          </div>
          <div className="booking-page-center">
            <SeatMatrix
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              liveInfo={liveInfo}
              title={title}
              city={city}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
