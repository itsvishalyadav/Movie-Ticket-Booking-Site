import "./MoviePageTexts.css";
import Genres from "../components/Genres";
import ExtraInfo from "../components/ExtraInfo";
import Plot from "../components/Plot";
import Rating from "../components/Rating";
import TrailerBookBtn from "../components/Trailer+Book-BTN";

export default function MoviePageTexts({ info }) {
  return (
    <div className="MoviePage">
      <div id="MoviePageTexts">
        <h1 className="movie-heading">
          {info.movieFirstName}{" "}
          <span className="movie-heading-highlight">
            {info.movieLastName}
          </span>
        </h1>
        <Genres genres={info.genres} />
        <ExtraInfo info={[info.length, info.languages, "☆ 3D,4D,IMAX"]} />
        <Plot plot={info.plot} />
        <Rating ratings={info.ratings} />
        <TrailerBookBtn />
      </div>
    </div>
  );
}
