import MovieInfo from "../components/MovieInfoBookingPage";
;


export default function BookingPage({info}) {
  return (
    <div id="BookingPage">
      <MovieInfo info={info}/>
    </div>
  );
}
