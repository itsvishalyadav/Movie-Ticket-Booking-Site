import { useEffect, useState } from "react";
import styles from "./TimeTheaterSelector.module.css";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function formatTime(unix) {
  const date = new Date(unix * 1000);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}.${minutes} ${ampm}`;
}

function TimeTheaterSelector({ liveInfo, title }) {
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const navigate = useNavigate();
  const handleTimeSelection = (showId) => {
    navigate(`/movie/${title}/booking/${showId}`);
  };

  useEffect(() => {
    if (liveInfo.theatres.length > 0) {
      const filtered = liveInfo.theatres
        .map((theater) => {
          const filteredTimings = theater.timings.filter(
            (timing) =>
              timing.language === liveInfo.language &&
              timing.format === liveInfo.format
          );

          if (filteredTimings.length === 0) return null;

          return {
            ...theater,
            timings: filteredTimings,
          };
        })
        .filter((t) => t !== null);

      setFilteredTheaters(filtered);
    } else {
      setFilteredTheaters([]);
    }
  }, [liveInfo]);

  return (
    <div className={styles["time-theater-selector"]}>
      {filteredTheaters.length > 0 ? (
        filteredTheaters.map((theater, index) => (
          <div key={index} className={styles.theaterCard}>
            <div className={styles.headerShowtimes}>
              <div className={styles.theaterHeader}>
                <FaFilm
                  className={styles.theaterLogo}
                  size={24}
                  color="black"
                />

                <div>
                  <h3>{theater.name}</h3>
                  <div className={styles.amenities}>
                    <div className={styles.amenity}>
                      <span className={styles.icon}>📱</span>
                      <span>M-Ticket</span>
                    </div>

                    <div className={styles.amenity}>
                      <span className={styles.icon}>🍿</span>
                      <span>Food & Beverage</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.showTimes}>
                {theater.timings.map((timeSlot, timeIndex) => {
                  const formattedTime = formatTime(timeSlot.time);
                  return (
                    <button
                      key={timeIndex}
                      className={styles.timeButton}
                      onClick={() => handleTimeSelection(timeSlot.showId)}
                    >
                      {formattedTime}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.cancellationInfo}>
              Cancellation available
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "0.3rem",
            opacity: "0.7",
          }}
        >
          No Shows Available
        </p>
      )}
    </div>
  );
}

export default TimeTheaterSelector;
