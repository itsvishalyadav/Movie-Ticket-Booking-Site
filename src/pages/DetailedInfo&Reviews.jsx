import React, { act } from "react";
import "./DetailedInfo&Reviews.css";
import DetailedCastSection from "../components/DetailedCastSection";
import DetailedMovieInfo from "../components/DetailedMovieInfo";

export default function DetailedInfoReviews({ info, onClose }) {
  return (
    <div className="detailed-info-ratings">
        <DetailedMovieInfo info={info} onClose={onClose} />
        <DetailedCastSection info={info} />
    </div>
  );
}
