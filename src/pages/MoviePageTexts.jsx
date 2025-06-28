import "./MoviePageTexts.css";
import Genres from "../components/Genres";
import ExtraInfo from "../components/ExtraInfo";
import Plot from "../components/Plot";
import Rating from "../components/Rating";
import TrailerBookBtn from "../components/Trailer+Book-BTN";

export default function MoviePageTexts({ genres, info, plot, ratings }) {
  let headStyle={ fontWeight: "900", fontSize: "40px" };
  return (
    <div id="MoviePageTexts">
      <h1 style={headStyle}>
        Black Panther: <span style={{...headStyle,color:"#5441FA"}}>Wakanda Forever</span>
      </h1>
      <Genres genres={genres} />
      <ExtraInfo info={info} />
      <Plot plot={plot} />
      <Rating ratings={ratings} />
      <TrailerBookBtn />
      
    </div>
  );
}
