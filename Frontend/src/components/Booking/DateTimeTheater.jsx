import DatePicker from "./DatePicker";
import styles from "./DateTimeTheater.module.css";
import TimeTheaterSelector from "./TimeTheaterSelector";
import LanguageFormatSelector from "./LanguageFormatSelector";
import { useState } from "react";

export default function DateTimeTheater({ liveInfo, setLiveInfo, title }) {
  
  return (
    <div className={styles["date-time-theater"]}>
      <div className={styles["picker-row"]}>
        <DatePicker liveInfo={liveInfo} setLiveInfo={setLiveInfo} />{" "}
        <LanguageFormatSelector liveInfo={liveInfo} setLiveInfo={setLiveInfo}/>{" "}
      </div>
      <TimeTheaterSelector
        liveInfo={liveInfo}
        setLiveInfo={setLiveInfo}
        title={title}
      />
    </div>
  );
}
