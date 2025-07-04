import "./DetailedCastSection.css";

export default function DetailedCastSection({ info }) {
  return (
    <div className="detailed-cast-section">
      <h2>Top Cast</h2>
      <div className="cast-grid">
        {info.cast && info.cast.length > 0 ? (
          info.cast.map((actor) => (
            <div className="cast-card" key={actor.id}>
              <img
                className="cast-image"
                src={
                  actor.profile
                    ? actor.profile
                    : "https://placehold.co/100x150?text=No+Image"
                }
                alt={actor.realName}
              />
              <div className="cast-name">{actor.realName}</div>
              <div className="cast-character">
                as {actor.character || "Unknown"}
              </div>
              <div className="cast-meta">
                Gender: {actor.gender === 1 ? "Female" : "Male"}
              </div>
              <div className="cast-meta">
                Popularity: {actor.popularity.toFixed(1)}
              </div>
            </div>
          ))
        ) : (
          <p>No cast info available.</p>
        )}
      </div>
    </div>
  );
}
