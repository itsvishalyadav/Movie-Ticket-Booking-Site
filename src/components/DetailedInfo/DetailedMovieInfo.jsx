import "./DetailedMovieInfo.css";

export default function DetailedMovieInfo({ info, onClose }) {
  return (
    <div className="detailed-info-section">
      <button
        className="close-details-btn"
        onClick={onClose}
        title="Back to top"
      >
        &#8593;
      </button>
      <h2>
        {info.movieFirstName} {info.movieLastName}
      </h2>
      <div className="detailed-info-list">
        {/* Director */}
        <div>
          <b className="infoHead">Director:</b>{" "}
          {info.director ? info.director.name : "Unknown"}
        </div>

        {/* Year */}
        <div>
          <b className="infoHead">Year:</b> {info.year}
        </div>

        {/* Country */}
        <div>
          <b className="infoHead">Country:</b>{" "}
          {info.country
            ? Array.isArray(info.country)
              ? info.country.join(", ")
              : info.country
            : "N/A"}
        </div>

        {/* Genres */}
        <div>
          <b className="infoHead">Genres:</b>{" "}
          {info.genres && info.genres.length > 0
            ? info.genres.join(", ")
            : "N/A"}
        </div>

        {/* Languages */}
        <div>
          <b className="infoHead">Languages:</b>{" "}
          {info.languages && info.languages.length > 0
            ? info.languages.join(", ")
            : "N/A"}
        </div>

        {/* Format */}
        <div>
          <b className="infoHead">Format:</b>{" "}
          {info.format && info.format.length > 0
            ? info.format.join(", ")
            : "N/A"}
        </div>

        {/* Duration */}
        <div>
          <b className="infoHead">Duration:</b>{" "}
          {info.length ? info.length : "N/A"}
        </div>
      </div>
    </div>
  );
}
