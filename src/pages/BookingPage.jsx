import MovieInfo from "../components/MovieInfoBookingPage";
;


export default function BookingPage({movieTile,imdbRating,movieLength}) {
  return (
    <div id="BookingPage">
      <MovieInfo movieTile={movieTile} imdbRating={imdbRating} movieLength={movieLength}/>
    </div>
  );
}
