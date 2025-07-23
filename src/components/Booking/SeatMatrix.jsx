import { useEffect , useState} from "react";
import "./SeatMatrix.css";
import BigBTN from "../Buttons/BigBTN";
import "./SeatPricingInfo.css";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client";
export const socket = io("http://localhost:8080");
function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}

export default function SeatMatrix({ selectedSeats, setSelectedSeats ,liveInfo , title}) {
  const {user} = useUser();
  const seats = Array.from({ length: 100 }, (_, index) => index);
  const [bookedSeats , setBookedSeats] = useState([]);
  const [showId , setShowId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!liveInfo.theatres || liveInfo.theatres.length === 0) return;
      let currShowId = (liveInfo.theatres.filter((theatre) => theatre.name === liveInfo.theatre))[0].timings.filter((time) => formatTime(time.time) === liveInfo.time)[0].showId; 
      setShowId(currShowId);
      setSelectedSeats([]);
      socket.emit('joinShow', currShowId);

      socket.on('seatData', ({ bookedSeats }) => setBookedSeats(bookedSeats));
      socket.on('seatsBooked', (seats) => {
        console.log(seats);
        setBookedSeats(prev => [...prev, ...seats]);
      });
      socket.on('seatsCancelled' , (seats) => {
        console.log(seats);
        setBookedSeats(prev => prev.filter(seat => !seats.includes(seat)));
      })
      socket.on('lockSuccess', (seat) => setSelectedSeats(prev => [...prev, seat]));
      socket.on('lockFailed', (msg) => alert(msg));

      return () => {
        socket.off('seatData');
        socket.off('seatsBooked');
        socket.off('lockSuccess');
        socket.off('lockFailed');
        socket.off('seatsCancelled');
      };
  }, [liveInfo]);

  return (
    <div className="outer-div">
    <div className="wholeDiv">
      <hr />
      <h2>Screen This Way</h2>

      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat+1}
            className={`seat ${bookedSeats.includes(seat + 1) ? "booked" : (selectedSeats.includes(seat+1) ? "selected" : "")}`}
            onClick={() => {
              if(bookedSeats.includes(seat + 1)) return;
              if(selectedSeats.includes(seat + 1)){
                socket.emit("unlockSeat" , {showId , seatNumber : seat + 1});
                setSelectedSeats(prev => prev.filter(s => s!== seat+1));
              }
              else{
                socket.emit("lockSeat" , {showId , seatNumber : seat + 1});
              }
            }}
          >
            {bookedSeats.includes(seat+1) ? (<img className="booked-seat" src="/bookedchair.png" alt="" />) 
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
        <div className="seat-info-item ">
          <img src="/bookedchair.png" alt="" />
          <span>Booked Seat</span>
        </div>
      </div>
    </div>
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
          onClick={() => {
            if (selectedSeats.length === 0) return alert('No seats selected');
            socket.emit('confirmSeats', { showId , seatNumbers: selectedSeats , userId : user._id});
            setSelectedSeats([]);
            navigate("/thank-you", {
              state: {
                movieName: title,
                cinemaName: liveInfo.theatre,
                // location: city,
                timing: `${liveInfo.date} ${liveInfo.time}`,
                screenNumber: liveInfo.screenNumber || "N/A"
              }
            });
          }}
        />
      </div>
    </div>
    </div>
  );
}

