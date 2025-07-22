import { useState, useRef } from "react";
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

function formatShowDate(unix) {
  const d = new Date(unix * 1000);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  return `${day}, ${monthDay}`;
}
function formatTime(unix) {
  const date = new Date(unix * 1000);
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}

function generateDates(numDays = 30) {
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
  const dates = generateDates(30);
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
