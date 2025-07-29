import { useState, useRef } from "react";
import styles from "./DatePicker.module.css";

function generateDates(numDays) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    dates.push({ day, date: monthDay });
  }
  return dates;
}

export default function DatePicker({liveInfo , setLiveInfo}) {
  // const [selectedDate, setSelectedDate] = useState("");
  const containerRef = useRef(null);
  const dates = generateDates(5);
  const scrollByAmount = (amount) => {
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const updateButton = (date) => {
      setLiveInfo((curr) => {
        return {...curr , date : date }
      })
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
        {dates.map((item, index) => {
          const isSelected = liveInfo.date === `${item.day}, ${item.date}`;
          return (
            <button
              key={index}
              className={
                styles.btn + " " +
                styles["date-btn-vertical"] +
                (isSelected ? " " + styles.selected : "")
              }
              onClick={() => updateButton(`${item.day}, ${item.date}`)}
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
