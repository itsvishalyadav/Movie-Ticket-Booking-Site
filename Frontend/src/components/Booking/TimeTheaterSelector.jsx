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

function TimeTheaterSelector({ liveInfo, setLiveInfo, title }) {
  const navigate = useNavigate();
  const handleTimeSelection = (showId) => {
    navigate(`/movie/${title}/booking/${showId}`);
  };

  return (
    <div className={styles["time-theater-selector"]}>
      {liveInfo.theatres.map((theater, index) => (
        <div key={index} className={styles.theaterCard}>
          <div className={styles.headerShowtimes}>
            <div className={styles.theaterHeader}>
              <FaFilm className={styles.theaterLogo} size={24} color="black" />

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

          <div className={styles.cancellationInfo}>Cancellation available</div>
        </div>
      ))}
    </div>
  );
}

export default TimeTheaterSelector;
