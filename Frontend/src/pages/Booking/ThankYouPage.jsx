import React from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
import QRCode from "react-qr-code";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketId = React.useMemo(() => uuidv4(), []);
  const booking = location.state;
  
  const handleExplore = () => {
    navigate("/");
  };

  
  return (
    <div className={styles.container}>
      <Header nonSticky />
      {booking ? (
        <div className={styles.content}>
          <h1>Thank You for Booking!</h1>
          <p>Your booking was successful. Enjoy your show!</p>
          <div className={styles.ticket}>
            <h2 className={styles.ticketTitle}>🎟️ Digital Ticket</h2>
            <QRCode
              className={styles.qrCode}
              value={ticketId}
              size={128}
              bgColor="#232323"
              fgColor="#f9ab00"
            />
            <div className={styles.ticketDetails}>
              {/* <p className={styles.details}><strong className={styles.boldText}>Ticket ID:</strong> {ticketId}</p> */}
              <p className={styles.details}>
                <strong className={styles.boldText}>Movie:</strong>{" "}
                {booking.movieName || "N/A"}
              </p>
              <p className={styles.details}>
                <strong className={styles.boldText}>Cinema:</strong>{" "}
                {booking.cinemaName || "N/A"}
              </p>
              <p className={styles.details}>
                <strong className={styles.boldText}>Timing:</strong>{" "}
                {new Date(booking.timing * 1000).toLocaleString()}
              </p>
              <p className={styles.details}>
                <strong className={styles.boldText}>Seats:</strong>{" "}
                {Array.isArray(booking.seats)
                  ? booking.seats.join(", ")
                  : "N/A"}
              </p>
              <p className={styles.details}>
                <strong className={styles.boldText}>Total Price:</strong> ₹
                {booking.totalPrice || "N/A"}
              </p>
            </div>
          </div>
          <button className={styles.exploreBtn} onClick={handleExplore}>
            Explore more shows
          </button>
        </div>
      ) : (
        <p>Fuck You</p>
      )}
      <Footer />
    </div>
  );
};

export default ThankYouPage;
