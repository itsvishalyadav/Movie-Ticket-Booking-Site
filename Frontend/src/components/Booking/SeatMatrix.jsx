import { useEffect, useState } from "react";
import styles from "./SeatMatrix.module.css";
import { io } from "socket.io-client";
import BigBTN from "../Buttons/BigBTN";
import seatPricingStyles from "./SeatPricingInfo.module.css";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "../Buttons/RazorBtn";
import ErrorMessage from "../Error/ErrorMessage";

export const socket = io("http://localhost:8080", {
  withCredentials: true,
});

let errorCallback = null;

export const setSocketErrorHandler = (cb) => {
  errorCallback = cb;
};

socket.on("connect_error", (err) => {
  if (errorCallback) errorCallback(err);
});

const SEAT_PRICES = {
  gold: 400,
  silver: 300,
  bronze: 250,
};

function getSeatType(seatNumber) {
  const row = Math.floor((seatNumber - 1) / 10);
  if (row < 2) return "gold";
  if (row < 6) return "silver";
  return "bronze";
}

export default function SeatMatrix({
  error,
  setError,
  showId,
  selectedSeats,
  setSelectedSeats,
  movieInfo,
}) {
  const { user } = useUser();
  const seats = Array.from({ length: 100 }, (_, index) => index + 1);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSocketErrorHandler(setError);
  }, []);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/shows/${showId}`,
          { credentials: "include" }
        );
        if(!response.ok){
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch show details");
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        setError(error.message || "Failed to fetch show details");
      }
    };

    fetchShowDetails();
  }, [showId]);

  useEffect(() => {
    setSelectedSeats([]);
    socket.emit("joinShow", showId);

    socket.on("error", (err) => {
      setError(err);
    });

    socket.on("seatData", ({ bookedSeats }) => setBookedSeats(bookedSeats));
    socket.on("seatsBooked", (seats) => {
      setBookedSeats((prev) => [...prev, ...seats]);
    });
    socket.on("seatsCancelled", (seats) => {
      setBookedSeats((prev) => prev.filter((seat) => !seats.includes(seat)));
    });
    socket.on("lockSuccess", (seat) =>
      setSelectedSeats((prev) => [...prev, seat])
    );
    socket.on("lockFailed", (msg) => alert(msg));

    return () => {
      socket.off("error");
      socket.off("seatData");
      socket.off("seatsBooked");
      socket.off("lockSuccess");
      socket.off("lockFailed");
      socket.off("seatsCancelled");
    };
  }, [showId, setSelectedSeats]);

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seatNumber) => {
      const type = getSeatType(seatNumber);
      return total + SEAT_PRICES[type];
    }, 0);
  };

  const renderSeats = () => {
    const seatElements = [];
    for (let i = 1; i <= 100; i++) {
      const seatType = getSeatType(i);
      seatElements.push(
        <div
          key={i}
          className={`${styles.seat} ${
            bookedSeats.includes(i)
              ? styles.booked
              : selectedSeats.includes(i)
              ? styles.selected
              : ""
          } ${styles[seatType]}`}
          onClick={() => {
            if (bookedSeats.includes(i)) return;
            if (selectedSeats.includes(i)) {
              socket.emit("unlockSeat", { showId, seatNumber: i });
              setSelectedSeats((prev) => prev.filter((s) => s !== i));
            } else {
              socket.emit("lockSeat", { showId, seatNumber: i });
            }
          }}
        >
          <img
            src={
              bookedSeats.includes(i)
                ? "/bookedchair.png"
                : selectedSeats.includes(i)
                ? "/selectedchair.png"
                : "/emptychair.png"
            }
            alt="Seat"
          />
        </div>
      );
      if (i === 20 || i === 60) {
        seatElements.push(<hr key={`hr-${i}`} className={styles.separator} />);
      }
    }
    return seatElements;
  };

  return (
    !error && (
    <div className={styles["outer-div"]}>
      <div className={styles.wholeDiv}>
        <hr />
        <h2>Screen This Way</h2>

        <div className={styles["seat-grid"]}>{renderSeats()}</div>
        <div className={styles["seat-info"]}>
          <div className={styles["seat-info-item"]}>
            <div className={`${styles["seat-color-box"]} ${styles.gold}`}></div>
            <span>Gold - ₹{SEAT_PRICES.gold}</span>
          </div>
          <div className={styles["seat-info-item"]}>
            <div
              className={`${styles["seat-color-box"]} ${styles.silver}`}
            ></div>
            <span>Silver - ₹{SEAT_PRICES.silver}</span>
          </div>
          <div className={styles["seat-info-item"]}>
            <div
              className={`${styles["seat-color-box"]} ${styles.bronze}`}
            ></div>
            <span>Bronze - ₹{SEAT_PRICES.bronze}</span>
          </div>
          <div className={styles["seat-info-item"]}>
            <img src="/selectedchair.png" alt="Selected Seat" />
            <span>Selected</span>
          </div>
          <div className={styles["seat-info-item"]}>
            <img src="/bookedchair.png" alt="" />
            <span>Booked</span>
          </div>
          <div className={styles["seat-info-item"]}>
            <img src="/emptychair.png" alt="" />
            <span>Empty</span>
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
        <h3>Total Price: ₹{calculateTotalPrice()}</h3>
        <div className={seatPricingStyles["action-buttons"]}>
          <RazorpayButton
            amount={selectedSeats.length * 250}
            selectedSeats={selectedSeats}
            onSuccess={(response) => {
              // Confirm seats after successful payment
              socket.emit("confirmSeats", {
                showId,
                seatNumbers: selectedSeats,
                userId: user._id,
                paymentId: response.razorpay_payment_id,
              });

              const seats = selectedSeats;
              setSelectedSeats([]);
              navigate("/thank-you", {
                state: {
                  movieName: movieInfo.title,
                  cinemaName: showDetails?.theatre?.name || "N/A",
                  timing: showDetails?.startTime,
                  seats: seats,
                  totalPrice: selectedSeats.length * 250,
                  paymentId: response.razorpay_payment_id,
                },
              });
            }}
          />
        </div>
      </div>
    </div>)
  )
}
