import "./MoviePageTexts.css";
import Genres from "../components/Genres";
import ExtraInfo from "../components/ExtraInfo";
import Plot from "../components/Plot";
import Rating from "../components/Rating";
import TrailerBookBtn from "../components/Trailer+Book-BTN";

export default function MoviePageTexts({ info }) {
  let headStyle = { fontWeight: "900", fontSize: "40px" };
  return (
    <div className="MoviePage">
      <div id="MoviePageTexts">
        <h1 style={headStyle}>
          {info.movieFirstName}{" "}
          <span style={{ ...headStyle, color: "#5441FA" }}>
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
