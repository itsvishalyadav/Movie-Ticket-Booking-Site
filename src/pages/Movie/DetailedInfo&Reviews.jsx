import React, { act } from "react";
import "./DetailedInfo&Reviews.css";
import DetailedCastSection from "../../components/DetailedInfo/DetailedCastSection";
import DetailedMovieInfo from "../../components/DetailedInfo/DetailedMovieInfo";

export default function DetailedInfoReviews({ info, onClose }) {
  return (
    <div className="detailed-info-ratings">
        <DetailedMovieInfo info={info} onClose={onClose} />
        <DetailedCastSection info={info} />
    </div>
  );
}
