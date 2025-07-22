import MovieTile from "./MovieTile";
import imdbLogo from "../../assets/imdb.svg";
import TrailerBtn from "../Buttons/TrailerBtn";
import styles from "./MovieInfoBookingPage.module.css";

export default function MovieInfo({ info }) {
  return (
    <div className={styles["movie-info-container"]}>
      <MovieTile className={styles["movie-tile"]} movieTile={info.movieTile} />
      <div className={styles["movie-info-details"]}>
        <h2>{info.title}</h2>
        <div className={styles["movie-info-meta"]}>
          <img className={styles["imdb-logo"]} src={imdbLogo} alt="IMDb" />
          <span>{info.ratings.imdbRating}/10</span>
          <span>●</span>
          <span>{info.length}</span>
          <span>●</span>
          <span>{info.genres.join(" / ")}</span>
        </div>
        <TrailerBtn trailer={info.trailer} customStyles={{ height: "1.25rem", width: "13.75rem" }} />
      </div>
    </div>
  );
}
