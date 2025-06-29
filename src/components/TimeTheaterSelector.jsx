import React, { useState } from "react";
import "./TimeTheaterSelector.css";

function TimeTheaterSelector({ liveInfo }) {
  const [time, setTime] = useState("");
  const [theater, setTheater] = useState("");

  return (
    <div className="time-theater-selector">
      <div className="time-selector">
        <label>Time: </label>
        <select
          className="select"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {liveInfo.timings.map((timing, index) => (
            <option key={index} value={timing}>
              {timing}
            </option>
          ))}
        </select>
      </div>
      <div className="theater-selector">
        <label>Theater: </label>
        <select
          className="select"
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
        >
          {liveInfo.theaters.map((theater, index) => (
            <option key={index} value={theater}>
              {theater}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeTheaterSelector;
