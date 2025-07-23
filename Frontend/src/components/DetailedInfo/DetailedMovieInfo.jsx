import styles from "./DetailedMovieInfo.module.css";

export default function DetailedMovieInfo({ info, onClose }) {
  return (
    <div className={styles["detailed-info-section"]}>
      <button
        className={styles["close-details-btn"]}
        onClick={onClose}
        title="Back to top"
      >
        &#8593;
      </button>
      <h2>
        {info.movieFirstName} {info.movieLastName}
      </h2>
      <div className={styles["detailed-info-list"]}>
        {/* Director */}
        <div>
          <b className={styles.infoHead}>Director:</b>{" "}
          {info.director ? info.director.name : "Unknown"}
        </div>

        {/* Year */}
        <div>
          <b className={styles.infoHead}>Year:</b> {info.year}
        </div>

        {/* Country */}
        <div>
          <b className={styles.infoHead}>Country:</b>{" "}
          {info.country
            ? Array.isArray(info.country)
              ? info.country.join(", ")
              : info.country
            : "N/A"}
        </div>

        {/* Genres */}
        <div>
          <b className={styles.infoHead}>Genres:</b>{" "}
          {info.genres && info.genres.length > 0
            ? info.genres.join(", ")
            : "N/A"}
        </div>

        {/* Languages */}
        <div>
          <b className={styles.infoHead}>Languages:</b>{" "}
          {info.languages && info.languages.length > 0
            ? info.languages.join(", ")
            : "N/A"}
        </div>

        {/* Format */}
        <div>
          <b className={styles.infoHead}>Format:</b>{" "}
          {info.format && info.format.length > 0
            ? info.format.join(", ")
            : "N/A"}
        </div>

        {/* Duration */}
        <div>
          <b className={styles.infoHead}>Duration:</b>{" "}
          {info.length ? info.length : "N/A"}
        </div>
      </div>
    </div>
  );
}
