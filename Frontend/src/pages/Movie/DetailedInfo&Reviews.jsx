import React, { act } from "react";
import "./DetailedInfo&Reviews.css";
import DetailedCastSection from "../../components/DetailedInfo/DetailedCastSection";
import DetailedMovieInfo from "../../components/DetailedInfo/DetailedMovieInfo";
import ReviewsAndRatingsSection from "../../components/DetailedInfo/ReviewsAndRatingsSection";

export default function DetailedInfoReviews({ info, onClose }) {
  return (
    <div className="detailed-info-ratings">
      <DetailedMovieInfo info={info} onClose={onClose} />
      <div className="detailed-info-sections">    
        <DetailedCastSection info={info} />
        <ReviewsAndRatingsSection info={info} />
      </div>
    </div>
  );
}
