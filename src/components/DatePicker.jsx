import SmallBTN from "./SmallBTN";
import { useState } from "react";
import "./DatePicker.css"; 

const dates = [
  { day: "Wed", date: "Jun 05" },
  { day: "Thu", date: "Jun 06" },
  { day: "Thu", date: "Jun 07" },
  { day: "Fri", date: "Jun 08" },
  { day: "Sat", date: "Jun 09" },
];

export default function DatePicker() {

  let [selectedDate, setSelectedDate] = useState("");
  let updateButton = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="date-picker">
      {dates.map((item, index) => {
        const isSelected = selectedDate === `${item.day}, ${item.date}`;
        return (
          <SmallBTN
            className={`btn date-btn-vertical ${isSelected ? "selected" : ""}`}
            TextForButton={
              <>
                <span className="date-btn-day">{item.day}</span>
                <span className="date-btn-date">{item.date}</span>
              </>
            }
            onClick={() => updateButton(`${item.day}, ${item.date}`)}
            noInlineStyles={true}
            key={index}
          />
        );
      })}
    </div>
  );
}
