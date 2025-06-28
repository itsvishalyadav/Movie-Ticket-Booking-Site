import MovieTile from "./MovieTile";
import imdbLogo from "../assets/imdb.svg";
import TrailerBtn from "./TrailerBtn";

export default function MovieInfo({ info }) {
  let styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={{...styles,gap:"100px",padding:"30px 0"}}>
      <MovieTile movieTile={info.movieTile} />
      <div
        style={{ ...styles, flexDirection: "column", alignItems: "flex-start",gap:"30px" }}
      >
        <h2>Black Panther: Wakanda Forever</h2>
        <div style={{ ...styles, gap: "10px" }}>
          <img style={{ height: "18px" }} src={imdbLogo} alt="" />
          <span>{info.ratings.imdbRating}/10</span> ● <span>{info.length}</span>{" "}
          ● <span>{info.genres.join("/")}</span>
        </div>
        <TrailerBtn customStyles={{ height: "20px", width: "220px" }} />
      </div>
    </div>
  );
}
