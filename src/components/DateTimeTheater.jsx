import DatePicker from "./DatePicker";
import TimeTheaterSelector from "./TimeTheaterSelector";

export default function DateTimeTheater({ liveInfo, onSelect }) {
    let styles={display: "flex", gap: "1rem" ,justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#1a191f", borderRadius: "10px"};
  return (
    <div className="date-time-theater" style={styles}>
      <DatePicker />
      <TimeTheaterSelector liveInfo={liveInfo} onSelect={onSelect} />
    </div>
  );
}
