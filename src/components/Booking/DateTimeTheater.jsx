import DatePicker from "./DatePicker";
import "./DateTimeTheater.css";
import TimeTheaterSelector from "./TimeTheaterSelector";

export default function DateTimeTheater({ liveInfo, onSelect }) {
  return (
    <div className="date-time-theater">
      <DatePicker />
      <TimeTheaterSelector liveInfo={liveInfo} onSelect={onSelect} />
    </div>
  );
}
