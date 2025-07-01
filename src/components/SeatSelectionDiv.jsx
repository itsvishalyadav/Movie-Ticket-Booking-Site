import './SeatSelectionDiv.css';
import SeatPricingInfo from "./SeatPricingInfo";
import SeatMatrix from "./SeatMatrix";
import { useState } from "react";

export default function SelectedSeatDiv() {
  let [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <div className="selected-seat-div">
      <SeatPricingInfo selectedSeats={selectedSeats} />
      <SeatMatrix
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
    </div>
  );
}
