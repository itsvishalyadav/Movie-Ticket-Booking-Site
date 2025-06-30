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
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => {
              setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.includes(seat)
                  ? prevSelectedSeats.filter((s) => s !== seat)
                  : [...prevSelectedSeats, seat]
              );
            }}
          >
            {seat }
          </div>
        ))}
      </div>
    </div>
  );
}
