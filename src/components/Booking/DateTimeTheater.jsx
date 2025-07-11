import DatePicker from "./DatePicker";
import "./DateTimeTheater.css";
import TimeTheaterSelector from "./TimeTheaterSelector";

export default function DateTimeTheater({ liveInfo , setLiveInfo , onSelect }) {
  return (
    <div className="date-time-theater">
      <DatePicker liveInfo = {liveInfo} setLiveInfo={setLiveInfo}/>
      <TimeTheaterSelector liveInfo={liveInfo} setLiveInfo={setLiveInfo} onSelect={onSelect} />
    </div>
  );
}
