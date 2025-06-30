import SeatPricingInfo from "./SeatPricingInfo";
import SeatMatrix from "./SeatMatrix";
import { useState } from "react";


export default function SelectedSeatDiv() {
  let [selectedSeats, setSelectedSeats] = useState([]);
  let styles = {
    display: "flex",
    padding: "20px",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    marginTop: "40px",
  };
  return (
    <div className="selected-seat-div" style={styles}>
      <SeatPricingInfo selectedSeats={selectedSeats} />
      <SeatMatrix
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
    </div>
  );
}
