import DatePicker from "../components/DatePicker";
import MovieInfo from "../components/MovieInfoBookingPage";
import TimeTheaterSelector from "../components/TimeTheaterSelector";
export default function BookingPage({ info ,liveInfo }) {
  return (
    <div id="BookingPage">
      <MovieInfo info={info} />
      <DatePicker />
      <TimeTheaterSelector liveInfo={liveInfo} />
    </div>
  );
}
