import styles from "./DetailedCastSection.module.css";

export default function DetailedCastSection({ info }) {
  return (
    <div className={styles["detailed-cast-section"]}>
      <h2>Top Cast</h2>
      <div className={styles["cast-grid"]}>
        {info.cast && info.cast.length > 0 ? (
          info.cast.map((actor) => (
            <div className={styles["cast-card"]} key={actor.id}>
              <img
                className={styles["cast-image"]}
                src={
                  actor.profile
                    ? actor.profile
                    : "https://placehold.co/100x150?text=No+Image"
                }
                alt={actor.realName}
              />
              <div className={styles["cast-name"]}>{actor.realName}</div>
              <div className={styles["cast-character"]}>
                as {actor.character || "Unknown"}
              </div>
              <div className={styles["cast-meta"]}>
                Gender: {actor.gender === 1 ? "Female" : "Male"}
              </div>
              <div className={styles["cast-meta"]}>
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
