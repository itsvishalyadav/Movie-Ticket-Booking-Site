import DateTimeTheater from "../components/DateTimeTheater";
import MovieInfo from "../components/MovieInfoBookingPage";
import SelectedSeatDiv from "../components/SelectedSeatDiv";
export default function BookingPage({ info, liveInfo }) {
  return (
    <div id="BookingPage">
      <MovieInfo info={info} />
      <DateTimeTheater liveInfo={liveInfo} />
      <SelectedSeatDiv selectedSeats={["H10", "H11", "H12"]} totalPrice={750} />
    </div>
  );
}
