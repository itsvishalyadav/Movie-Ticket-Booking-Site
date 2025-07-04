import React, { useState } from "react";
import { useEffect } from "react";
import "./MoviePageTexts.css";
import Genres from "../components/Genres";
import ExtraInfo from "../components/ExtraInfo";
import Plot from "../components/Plot";
import Rating from "../components/Rating";
import TrailerBookBtn from "../components/Trailer+Book-BTN";
import DetailedInfoReviews from "./DetailedInfo&Reviews";

export default function MoviePageTexts({ info, onBookTicket }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
        <TrailerBookBtn
          onMoreInfo={() => setShowDetails(true)}
          onBookTicket={onBookTicket}
        />
      </div>
      <DetailedInfoReviews info={info} onClose={() => setShowDetails(false)} />
    </div>
  );
}
