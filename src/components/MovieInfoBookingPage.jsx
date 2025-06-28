import MovieTile from "./MovieTile";
import imdbLogo from "../assets/imdb.svg";

export default function MovieInfo({ movieTile, imdbRating,movieLength }) {
  let styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={styles}>
      <MovieTile movieTile={movieTile} />
      <div
        style={{ ...styles, flexDirection: "column", alignItems: "flex-start" }}
      >
        <h3>Black Panther: Wakanda Forever</h3>
        <div style={styles}>
          <img style={{ height: "20px" }} src={imdbLogo} alt="" />
          {imdbRating}/10 {movieLength}
        </div>
      </div>
    </div>
  );
}
