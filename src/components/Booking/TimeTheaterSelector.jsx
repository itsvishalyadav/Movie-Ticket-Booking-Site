import React, { useEffect, useState } from "react";
import "./TimeTheaterSelector.css";
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

function TimeTheaterSelector({ liveInfo  , setLiveInfo}) {
  return (
    <div className="time-theater-selector">
      <div className="time-selector">
        <label>Time: </label>
        <select
          className="select"
          value={liveInfo.time}
          onChange={(e) => setLiveInfo((curr) => {
            return {...curr , time : e.target.value}
          })}
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
          value={liveInfo.theatre}
          onChange={(e) => setLiveInfo((curr) => {
            let timings = liveInfo.theatres.filter((theatre) => theatre.name === e.target.value)[0].timings
            let time = timings[0];
            return {...curr , theatre : e.target.value , timings : timings.map(time => formatTime(time.time)) ,  time : formatTime(time.time)}
          })}
        >
          {liveInfo.theatres.map((theater, index) => (
            <option key={index} value={theater.name}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeTheaterSelector;
