import BigBTN from "./BigBTN";
import "./SeatPricingInfo.css";
export default function SeatPricingInfo({ selectedSeats }) {
  return (
    <div className="selected-seat-info">
      <h2>Selected Seats</h2>
      <hr className="dashed-line"/>
      {selectedSeats.length > 0 ? (
        <div className="selectedSeatBoxOuterDiv">
          {selectedSeats.map((seat, index) => (
            <div className="selectedSeatBox" key={index}>
              {seat}
            </div>
          ))}
        </div>
      ) : (
        <p>No seats selected</p>
      )}
      <h3>Total Price: ₹{selectedSeats.length * 250}</h3>
      <div className="action-buttons">
        <BigBTN
          otherStyles={{ backgroundColor: "#1a191f", height: "2.2rem" }}
          TextForButton={"+ Add Food Items"}
        />
        <BigBTN
          otherStyles={{ height: "2.2rem" }}
          TextForButton={"Purchase Seats"}
        />
      </div>
    </div>
  );
}
