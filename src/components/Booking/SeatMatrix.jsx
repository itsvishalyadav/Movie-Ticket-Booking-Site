import "./SeatMatrix.css";

export default function SeatMatrix({ selectedSeats, setSelectedSeats }) {
  const seats = Array.from({ length: 100 }, (_, index) => index);

  return (
    <div className="wholeDiv">
      <hr />
      <h2>Screen This Way</h2>

      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat+1}
            className={`seat ${selectedSeats.includes(seat+1) ? "selected" : ""}`}
            onClick={() => {
              setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.includes(seat + 1)
                  ? prevSelectedSeats.filter((s) => s !== seat+1)
                  : [...prevSelectedSeats, seat + 1]
              );
            }}
          >
            {selectedSeats.includes(seat+1) ? (
              <img
                className="selected-chair"
                src="/selectedchair.png"
                alt="Seat"
              />
            ) : (
              <img className="empty-chair" src="/emptychair.png" alt="Seat" />
            )}
          </div>
        ))}
      </div>
      <div className="seat-info">
        <div className="seat-info-item">
          <img src="/selectedchair.png" alt="Selected Seat" />
          <span>Selected Seat</span>
        </div>
        <div className="seat-info-item">
          <img src="/emptychair.png" alt="Empty Seat" />
          <span>Empty Seat</span>
        </div>
        <div className="seat-info-item">
          <img src="/bookedchair.png" alt="" />
          <span>Booked Seat</span>
        </div>
      </div>
    </div>
  );
}
