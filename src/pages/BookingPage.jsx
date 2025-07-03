import DateTimeTheater from "../components/DateTimeTheater";
import MovieInfo from "../components/MovieInfoBookingPage";
import SeatPricingInfo from "../components/SeatPricingInfo";
import SeatMatrix from "../components/SeatMatrix";
import "./BookingPage.css";
import { useState } from "react";

export default function BookingPage({ info, liveInfo }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <div
      style={{
        background: `
          radial-gradient(circle, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%) no-repeat center/cover,
          url(${info.bgImage}) no-repeat center/cover
        `,
      }}
      id="BookingPage"
    >
      <MovieInfo info={info} />
      <div className="booking-page-flex-row">
        <div className="date-time-theater">
          <DateTimeTheater liveInfo={liveInfo} />
        </div>
        <div className="booking-page-center">
          <SeatMatrix
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </div>
        <div className="seat-pricing-info">
          <SeatPricingInfo selectedSeats={selectedSeats} />
        </div>
      </div>
    </div>
  );
}
