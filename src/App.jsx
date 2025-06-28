import "./App.css";
import BookingPage from "./pages/BookingPage";
import MoviePage from "./pages/MoviePage";
import MoviePageTexts from "./pages/MoviePageTexts";
import tileImage from "./assets/movieTile.jpeg";
function App() {
  let movieInfo = {
    movieTile: tileImage,
    genres: ["Action", "Adventure", "Fantasy"],
    length: "⏱ 2HRS 41MINS",
    languages: "🌐 English",
    plot: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom.",
    ratings: { imdbRating: 8, rtRating: 84, googleLikes: 81 },
  };
  return (
    // <MoviePageTexts info={movieInfo} />
    <BookingPage
      info={movieInfo}

    />
  );
}

export default App;
