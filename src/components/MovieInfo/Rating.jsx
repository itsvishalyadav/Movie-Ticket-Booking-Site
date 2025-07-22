import imdbLogo from "../../assets/imdb.svg";
import rtLogo from "../../assets/Rotten_Tomatoes.svg";
import heartLogo from "../../assets/red-heart-icon.svg";
import styles from './Rating.module.css';

export default function Rating({ ratings }) {
  return (
    <div className={styles["rating-container"]}>
      <div className={styles["rating-pair"]}>
        <img className={styles["rating-logo"]} src={imdbLogo} alt="imdb" />
        <span> : {ratings.imdbRating}/10</span>
      </div>
      <div className={styles["rating-pair"]}>
        <img className={styles["rating-logo"]} src={rtLogo} alt="rotten tomatoes" />
        <span> : {ratings.rtRating}%</span>
      </div>
      <div className={styles["rating-pair"]}>
        <img className={styles["rating-logo"]} src={heartLogo} alt="google users" />
        <span> : {ratings.googleLikes}% Liked it</span>
      </div>
    </div>
  );
}
