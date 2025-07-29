import DatePicker from "./DatePicker";
import styles from "./DateTimeTheater.module.css";
import TimeTheaterSelector from "./TimeTheaterSelector";

export default function DateTimeTheater({ liveInfo , setLiveInfo , title}) {
  return (
    <div className={styles["date-time-theater"]}>
      <DatePicker liveInfo = {liveInfo} setLiveInfo={setLiveInfo}/>
      <TimeTheaterSelector liveInfo={liveInfo} setLiveInfo={setLiveInfo} title = {title}/>
    </div>
  );
}
