import imdbLogo from "../../assets/imdb.svg";
import rtLogo from "../../assets/Rotten_Tomatoes.svg";
import heartLogo from "../../assets/red-heart-icon.svg";
import './Rating.css';

export default function Rating({ ratings }) {
  return (
    <div className="rating-container">
      <div className="rating-pair">
        <img className="rating-logo" src={imdbLogo} alt="imdb" />
        <span> : {ratings.imdbRating}/10</span>
      </div>
      <div className="rating-pair">
        <img className="rating-logo" src={rtLogo} alt="rotten tomatoes" />
        <span> : {ratings.rtRating}%</span>
      </div>
      <div className="rating-pair">
        <img className="rating-logo" src={heartLogo} alt="google users" />
        <span> : {ratings.googleLikes}% Liked it</span>
      </div>
    </div>
  );
}
