import React from "react";
// import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
import QRCode from "react-qr-code";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const ticketId = React.useMemo(() => uuidv4(), []);
  const booking = location.state || {};

  const handleExplore = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <Header nonSticky/>
      <div className={styles.content}>
        <h1>Thank You for Booking!</h1>
        <p>Your booking was successful. Enjoy your show!</p>
        <div className={styles.ticket}>
          <h2 className={styles.ticketTitle}>🎟️ Digital Ticket</h2>
          <QRCode className={styles.qrCode} value="tmkbfjg" size={128} bgColor="#232323" fgColor="#f9ab00"  />
          <div className={styles.ticketDetails}>
            {/* <p className={styles.details}><strong className={styles.boldText}>Ticket ID:</strong> {ticketId}</p> */}
            <p className={styles.details}><strong className={styles.boldText}>Movie:</strong> {booking.movieName || "Ballerina"}</p>
            <p className={styles.details}><strong className={styles.boldText}>Cinema:</strong> {booking.cinemaName || "PVR City Cinema"}</p>
            <p className={styles.details}><strong className={styles.boldText}>Screen:</strong> {booking.screenNumber || "3"}</p>
            {/* <p className={styles.details}><strong className={styles.boldText}>Location:</strong> {booking.location || "Near Bus Stand"}</p> */}
            <p className={styles.details}><strong className={styles.boldText}>Timing:</strong> {booking.timing || "10:00 AM"}</p>
            <p className={styles.details}><strong className={styles.boldText}>Total Price:</strong> ₹{booking.totalPrice || "250"}</p>
            <p className={styles.details}><strong className={styles.boldText}>Seats:</strong> {booking.seats || "1,2,3"}</p>
          </div>
        </div>
        <button className={styles.exploreBtn} onClick={handleExplore}>
          Explore more shows
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYouPage; 