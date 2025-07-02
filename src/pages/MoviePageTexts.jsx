import React, { useState } from "react";
import { useEffect } from "react";
import "./MoviePageTexts.css";
import Genres from "../components/Genres";
import ExtraInfo from "../components/ExtraInfo";
import Plot from "../components/Plot";
import Rating from "../components/Rating";
import TrailerBookBtn from "../components/Trailer+Book-BTN";
import DetailedInfoReviews from "./DetailedInfo&Reviews";

export default function MoviePageTexts({ info }) {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
  if (showDetails) {
    // Lock scroll
    document.body.style.overflow = "hidden";
  } else {
    // Re-enable scroll
    document.body.style.overflow = "";
  }

  // Cleanup if component unmounts
  return () => {
    document.body.style.overflow = "";
  };
}, [showDetails]);

  return (
    <div className={`MoviePage${showDetails ? " swipe-up" : ""}`}>
      <div id="MoviePageTexts">
        <h1 className="movie-heading">
          {info.movieFirstName}{" "}
          <span className="movie-heading-highlight">{info.movieLastName}</span>
        </h1>
        <Genres genres={info.genres} />
        <ExtraInfo
          info={{
            length: info.length,
            languages: info.languages,
            format: info.format,
          }}
        />
        <Plot plot={info.plot} />
        <Rating ratings={info.ratings} />
        <TrailerBookBtn onMoreInfo={() => setShowDetails(true)} />
      </div>
      <DetailedInfoReviews info={info} onClose={() => setShowDetails(false)} />
    </div>
  );
}
