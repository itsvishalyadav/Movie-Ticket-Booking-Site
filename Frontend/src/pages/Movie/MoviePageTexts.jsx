import React, { useState } from "react";
import { useEffect } from "react";
import "./MoviePageTexts.css";
import Genres from "../../components/MovieInfo/Genres";
import ExtraInfo from "../../components/MovieInfo/ExtraInfo";
import Plot from "../../components/MovieInfo/Plot";
import Rating from "../../components/MovieInfo/Rating";
import TrailerBookBtn from "../../components/Buttons/Trailer+Book-BTN";
import DetailedInfoReviews from "./DetailedInfo&Reviews";

export default function MoviePageTexts({ info , reviews , setReviews}) {
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
        <TrailerBookBtn trailer={info.trailer}
          onMoreInfo={() => setShowDetails(true)}
        />
      </div>
      <DetailedInfoReviews info={info} reviews = {reviews} setReviews = {setReviews} onClose={() => setShowDetails(false)} />
    </div>
  );
}
