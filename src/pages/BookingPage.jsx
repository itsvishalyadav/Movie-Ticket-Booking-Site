import DateTimeTheater from "../components/DateTimeTheater";
import MovieInfo from "../components/MovieInfoBookingPage";
import SeatPricingInfo from "../components/SeatPricingInfo";
import SeatMatrix from "../components/SeatMatrix";
import "./BookingPage.css";
import { useState } from "react";

export default function BookingPage({ info, liveInfo }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <div id="BookingPage">
      <MovieInfo info={info} />
      <div
        style={{
          background: `linear-gradient(
          rgba(0,0,0,0.5), 
          rgba(0,0,0,0.5)
        ), url(${info.bgImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="booking-page-flex-row"
      >
        <DateTimeTheater liveInfo={liveInfo} />
        <div className="booking-page-center">
          <SeatMatrix selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
        </div>
        <SeatPricingInfo selectedSeats={selectedSeats} />
      </div>
    </div>
  );
}
