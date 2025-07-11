import { useEffect , useState} from "react";
import "./SeatMatrix.css";
function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}
export default function SeatMatrix({ selectedSeats, setSelectedSeats ,liveInfo}) {
  const seats = Array.from({ length: 100 }, (_, index) => index);
  const [bookedSeats , setBookedSeats] = useState([]);
  useEffect(() => {
    const getSeatInfo = async () => {
      const showId = (liveInfo.theatres.filter((theatre) => theatre.name === liveInfo.theatre))[0].timings.filter((time) => formatTime(time.time) === liveInfo.time)[0].showId;
      const data = await fetch(`http://localhost:8080/api/shows/seatInfo/${showId}`)
      setBookedSeats(await data.json());
      // setSelectedSeats(selectedSeats.filter((seat) => !bookedSeats.includes(seat)));
    }
    getSeatInfo();
  })
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
              !bookedSeats.includes(seat + 1) &&
              setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.includes(seat + 1)
                  ? prevSelectedSeats.filter((s) => s !== seat+1)
                  : [...prevSelectedSeats, seat + 1]
              );
            }}
          >
            {console.log(bookedSeats)}
            {bookedSeats.includes(seat+1) ? (<img src="/bookedchair.png" alt="" />) 
             : (selectedSeats.includes(seat+1) ? (
              <img
                className="selected-chair"
                src="/selectedchair.png"
                alt="Seat"
              />
            ) : (
              <img className="empty-chair" src="/emptychair.png" alt="Seat" />
            ))
            }
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
