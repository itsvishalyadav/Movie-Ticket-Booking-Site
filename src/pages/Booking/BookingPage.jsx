import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Header from "../../components/Layout/Header";
import DateTimeTheater from "../../components/Booking/DateTimeTheater";
import MovieInfo from "../../components/MovieInfo/MovieInfoBookingPage";
import SeatMatrix from "../../components/Booking/SeatMatrix";
import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/userContext";
import "./BookingPage.css";
import { 
  getMoviesUrl, 
  getMovieDetails, 
  searchMovies
} from "/src/movieApi.js";

function formatCurrentDate() {
  const now = new Date();

  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return `${day}, ${monthDay}`;
}

function formatShowDate(unix) {
  const d = new Date(unix * 1000);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  return `${day}, ${monthDay}`;
}
function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}

export default function BookingPage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { city } = useCity();
  const { user } = useUser();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveInfo , setLiveInfo] = useState({
    theatres : [] , theatre : "", timings : [] , date : formatCurrentDate() , time : ""
  });

  useEffect(() => {
    const fetchShowData = async () => {
      const theatreData = await fetch(`http://localhost:8080/api/shows/${city}/${title}/${liveInfo.date}`);
      const theatres = await theatreData.json();
      setLiveInfo((curr) => {
        return {...curr , theatres : theatres , theatre : theatres[0].name , timings : theatres[0].timings.map(time => formatTime(time.time)) ,  time : theatres[0].timings.map(time => formatTime(time.time))[0]}
      })
    };
    fetchShowData();
  } , [title , city , liveInfo.date]);

  useEffect(() => {
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
  }, []);

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
            <DateTimeTheater liveInfo = {liveInfo} setLiveInfo={setLiveInfo}/>
          </div>
          <div className="booking-page-center">
            <SeatMatrix
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              liveInfo = {liveInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
