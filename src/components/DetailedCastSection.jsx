import "./DetailedCastSection.css";

export default function DetailedCastSection({ info }) {
  return (
    <div className="detailed-cast-section">
      <h2>Cast: </h2>
      <div className="cast-grid">
        {info.cast &&
          info.cast.map((actor, index) => (
            <div className="cast-card" key={index}>
              <img
                className="cast-image"
                src="https://placehold.co/100x150"
                alt=""
              />
              <div className="cast-name">{actor}</div>
            </div>
          ))}
      </div>
      </div>
  );
}