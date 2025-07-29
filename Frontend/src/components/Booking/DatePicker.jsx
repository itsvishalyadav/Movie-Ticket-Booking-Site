// DatePicker.jsx
import React, { useRef, useEffect } from "react";
import styles from "./DatePicker.module.css";

function formatCurrentDate() {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  return `${day}, ${monthDay}`;
}

function generateDates(numDays) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    dates.push({ day, date: monthDay });
  }
  return dates;
}

export default function DatePicker({ liveInfo, setLiveInfo }) {
  const containerRef = useRef(null);
  const dates = generateDates(5);

  // On mount, if no date is selected yet, default to today
  useEffect(() => {
    if (!liveInfo.date) {
      setLiveInfo((curr) => ({ ...curr, date: formatCurrentDate() }));
    }
  }, [liveInfo.date, setLiveInfo]);

  const scrollByAmount = (amount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const updateButton = (dateStr) => {
    setLiveInfo((curr) => ({ ...curr, date: dateStr }));
  };

  return (
    <div className={styles["date-picker-wrapper"]}>
      <button
        className={styles["scroll-btn"]}
        onClick={() => scrollByAmount(-188)}
        aria-label="Scroll Left"
      >
        &#8592;
      </button>

      <div className={styles["date-picker"]} ref={containerRef}>
        {dates.map((item, idx) => {
          const label = `${item.day}, ${item.date}`;
          const isSelected = liveInfo.date === label;
          return (
            <button
              key={idx}
              className={
                `${styles.btn} ${styles["date-btn-vertical"]}` +
                (isSelected ? ` ${styles.selected}` : "")
              }
              onClick={() => updateButton(label)}
            >
              <span className={styles["date-btn-day"]}>{item.day}</span>
              <span className={styles["date-btn-date"]}>{item.date}</span>
            </button>
          );
        })}
      </div>

      <button
        className={styles["scroll-btn"]}
        onClick={() => scrollByAmount(188)}
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
}
