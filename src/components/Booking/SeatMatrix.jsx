import { useEffect, useState } from "react";
import styles from "./SeatMatrix.module.css";
import { io } from "socket.io-client";
import BigBTN from "../Buttons/BigBTN";
import seatPricingStyles from "./SeatPricingInfo.module.css";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:8080");
function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}

export default function SeatMatrix({ selectedSeats, setSelectedSeats, liveInfo, title, city }) {
  const seats = Array.from({ length: 100 }, (_, index) => index);
  const [bookedSeats , setBookedSeats] = useState([]);
  const [showId , setShowId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
      let currShowId = (liveInfo.theatres.filter((theatre) => theatre.name === liveInfo.theatre))[0].timings.filter((time) => formatTime(time.time) === liveInfo.time)[0].showId; 
      setShowId(currShowId);
      setSelectedSeats([]);
      socket.emit('joinShow', currShowId);

      socket.on('seatData', ({ bookedSeats }) => setBookedSeats(bookedSeats));
      socket.on('seatsBooked', (seats) => setBookedSeats(prev => [...prev, ...seats]));
      socket.on('lockSuccess', (seat) => setSelectedSeats(prev => [...prev, seat]));
      socket.on('lockFailed', (msg) => alert(msg));

      return () => {
        socket.off('seatData');
        socket.off('seatsBooked');
        socket.off('lockSuccess');
        socket.off('lockFailed');
      };
  }, [liveInfo]);

  return (
    <div className={styles["outer-div"]}>
      <div className={styles.wholeDiv}>
      <hr />
      <h2>Screen This Way</h2>

        <div className={styles["seat-grid"]}>
        {seats.map((seat) => (
          <div
              key={seat + 1}
              className={`${styles.seat} ${selectedSeats.includes(seat + 1) ? styles.selected : ""
                }`}
            onClick={() => {
                if (bookedSeats.includes(seat + 1)) return;
                if (selectedSeats.includes(seat + 1)) {
                  socket.emit("unlockSeat", { showId, seatNumber: seat + 1 });
                  setSelectedSeats((prev) => prev.filter((s) => s !== seat + 1));
                } else {
                  socket.emit("lockSeat", { showId, seatNumber: seat + 1 });
              }
            }}
          >
              {bookedSeats.includes(seat + 1) ? (
                <img src="/bookedchair.png" alt="" />
              ) : selectedSeats.includes(seat + 1) ? (
              <img
                  className={styles["selected-chair"]}
                src="/selectedchair.png"
                alt="Seat"
              />
            ) : (
                <img
                  className={styles["empty-chair"]}
                  src="/emptychair.png"
                  alt="Seat"
                />
              )}
          </div>
        ))}
      </div>
        <div className={styles["seat-info"]}>
          <div className={styles["seat-info-item"]}>
          <img src="/selectedchair.png" alt="Selected Seat" />
          <span>Selected Seat</span>
        </div>
          <div className={styles["seat-info-item"]}>
          <img src="/emptychair.png" alt="Empty Seat" />
          <span>Empty Seat</span>
        </div>
          <div className={styles["seat-info-item"]}>
          <img src="/bookedchair.png" alt="" />
          <span>Booked Seat</span>
        </div>
      </div>
    </div>
      <div className={seatPricingStyles["selected-seat-info"]}>
      <h2>Selected Seats</h2>
        <hr className={seatPricingStyles["dashed-line"]} />
      {selectedSeats.length > 0 ? (
          <div className={seatPricingStyles.selectedSeatBoxOuterDiv}>
          {selectedSeats.map((seat, index) => (
              <div className={seatPricingStyles.selectedSeatBox} key={index}>
              {seat}
            </div>
          ))}
        </div>
      ) : (
        <p>No seats selected</p>
      )}
      <h3>Total Price: ₹{selectedSeats.length * 250}</h3>
        <div className={seatPricingStyles["action-buttons"]}>
        <BigBTN
          otherStyles={{ backgroundColor: "#1a191f", height: "2.2rem" }}
          TextForButton={"+ Add Food Items"}
        />
        <BigBTN
          otherStyles={{ height: "2.2rem" }}
          TextForButton={"Purchase Seats"}
          onClick={() => {
              if (selectedSeats.length === 0) return alert("No seats selected");
              socket.emit("confirmSeats", {
                showId,
                seatNumbers: selectedSeats,
              });
            setSelectedSeats([]);
            navigate("/thank-you", {
              state: {
                movieName: title,
                cinemaName: liveInfo.theatre,
                location: city,
                timing: `${liveInfo.date} ${liveInfo.time}`,
                  screenNumber: liveInfo.screenNumber || "N/A",
                },
            });
          }}
        />
      </div>
    </div>
    </div>
  );
}
