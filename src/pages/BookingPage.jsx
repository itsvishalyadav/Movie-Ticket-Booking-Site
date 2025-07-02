import DateTimeTheater from "../components/DateTimeTheater";
import MovieInfo from "../components/MovieInfoBookingPage";
import SelectedSeatDiv from "../components/SeatSelectionDiv";
import "./BookingPage.css";
export default function BookingPage({ info, liveInfo }) {
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
        className="booking-page-datetime-seat-wrapper"
      >
        <DateTimeTheater liveInfo={liveInfo} />
        <SelectedSeatDiv bgImage={info.bgImage1} />
      </div>
    </div>
  );
}
