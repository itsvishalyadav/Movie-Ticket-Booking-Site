import { useState, useRef } from "react";
import "./DatePicker.css";

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

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState("");
  const containerRef = useRef(null);
  const dates = generateDates(30);

  const scrollByAmount = (amount) => {
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const updateButton = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="date-picker-wrapper">
      <button
        className="scroll-btn"
        onClick={() => scrollByAmount(-188)}
        aria-label="Scroll Left"
      >
        &#8592;
      </button>
      <div className="date-picker" ref={containerRef}>
        {dates.map((item, index) => {
          const isSelected = selectedDate === `${item.day}, ${item.date}`;
          return (
            <button
              key={index}
              className={`btn date-btn-vertical ${isSelected ? "selected" : ""}`}
              onClick={() => updateButton(`${item.day}, ${item.date}`)}
            >
              <span className="date-btn-day">{item.day}</span>
              <span className="date-btn-date">{item.date}</span>
            </button>
          );
        })}
      </div>
      <button
        className="scroll-btn"
        onClick={() => scrollByAmount(188)}
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
}
