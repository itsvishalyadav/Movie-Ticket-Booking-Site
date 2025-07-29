import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ShowTimePage.module.css";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import DateTimeTheater from "../../components/Booking/DateTimeTheater";
import MovieInfo from "../../components/MovieInfo/MovieInfoBookingPage";
import { useCity } from "../../contexts/CityContext";
import Loader from "../../components/Loader/Loader";

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

function ShowTimePage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const { city } = useCity();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveInfo, setLiveInfo] = useState({
    theatres: [],
    date: formatCurrentDate(),
  });

  useEffect(() => {
    const fetchShowData = async () => {
      const theatreData = await fetch(
        ` http://localhost:8080/api/shows/${city}/${title}/${liveInfo.date}`
      );
      const theatres = await theatreData.json();
      theatres.length > 0
        ? setLiveInfo((curr) => ({
            ...curr,
            theatres: theatres,
          }))
        : setLiveInfo({
            theatres: [],
            date: formatCurrentDate(),
          });
    };
    fetchShowData();
  }, [title, city, liveInfo.date]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await fetch(
          ` http://localhost:8080/api/movies/${title}`
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
    <div className={styles.container}>
      <Header />
      <div
        style={{
          background: `
              radial-gradient(circle, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%) no-repeat center/cover,
              url(${movieInfo.bgImage}) no-repeat center/cover
            `,
        }}
        className={styles.movieSection}
      >
        <MovieInfo info={movieInfo} />

        <section className={styles.showsSection}>
          <DateTimeTheater
            title={title}
            liveInfo={liveInfo}
            setLiveInfo={setLiveInfo}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ShowTimePage;
