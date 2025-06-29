import "./App.css";
import BookingPage from "./pages/BookingPage";
import MoviePageTexts from "./pages/MoviePageTexts";
import tileImage from "./assets/movieTile.jpeg";
function App() {
  let movieInfo = {
    movieFirstName: "Black Panther: ",
    movieLastName: "Wakanda Forever",
    movieTile: tileImage,
    genres: ["Action", "Adventure", "Fantasy"],
    length: "⏱ 2HRS 41MINS",
    languages: "🌐 English",
    plot: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom.",
    ratings: { imdbRating: 8, rtRating: 84, googleLikes: 81 },
  };
  let liveInfo={
    timings: ["09:45 AM", "12:30 PM", "03:15 PM", "06:15 PM"],
    theaters: ["Vaishali Nagar", "Sector 17", "City Cinema"],

  }
  return (
    // <MoviePageTexts info={movieInfo} />
    <BookingPage info={movieInfo} liveInfo={liveInfo} />
  );
}

export default App;
