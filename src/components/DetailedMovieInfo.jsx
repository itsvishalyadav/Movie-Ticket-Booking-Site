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
          <div>
            <b className="infoHead">Director:</b> {info.director}
          </div>
          <div>
            <b className="infoHead">Year:</b> {info.year}
          </div>
          <div>
            <b className="infoHead">Country:</b> {info.country}
          </div>

          <div>
            <b className="infoHead">Genres:</b>{" "}
            {info.genres && info.genres.join(", ")}
          </div>
          <div>
            <b className="infoHead">Languages:</b>{" "}
            {info.languages && info.languages.join(", ")}
          </div>
          <div>
            <b className="infoHead">Format:</b>{" "}
            {info.format && info.format.join(", ")}
          </div>
          <div>
            <b className="infoHead">Duration:</b> {info.length}
          </div>
        </div>
        </div>

  );
}

