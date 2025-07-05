import MovieTile from "./MovieTile";
import imdbLogo from "../../assets/imdb.svg";
import TrailerBtn from "../Buttons/TrailerBtn";
import "./MovieInfoBookingPage.css";

export default function MovieInfo({ info }) {
  return (
    <div className="movie-info-container">
      <MovieTile className="movie-tile" movieTile={info.movieTile} />
      <div className="movie-info-details">
        <h2>{info.title}</h2>
        <div className="movie-info-meta">
          <img className="imdb-logo" src={imdbLogo} alt="IMDb" />
          <span>{info.ratings.imdbRating}/10</span>
          <span>●</span>
          <span>{info.length}</span>
          <span>●</span>
          <span>{info.genres.join(" / ")}</span>
        </div>
        <TrailerBtn customStyles={{ height: "1.25rem", width: "13.75rem" }} />
      </div>
    </div>
  );
}
