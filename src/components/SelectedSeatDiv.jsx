import SeatPricingInfo from "./SeatPricingInfo";
import SeatMatrix from "./SeatMatrix";

export default function SelectedSeatDiv({ selectedSeats, totalPrice }) {
    let styles = {display: "flex",  gap: "1rem", padding: "20px",  borderRadius: "10px" ,justifyContent: "center", alignItems: "center"};
  return (
    <div className="selected-seat-div" style={styles}>
      <SeatPricingInfo selectedSeats={selectedSeats} totalPrice={totalPrice} />
      <SeatMatrix selectedSeats={selectedSeats} />
    </div>
  );
}
