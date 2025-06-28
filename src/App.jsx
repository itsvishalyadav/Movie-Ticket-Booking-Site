import "./App.css";
import MoviePage from "./pages/MoviePage";
import MoviePageTexts from "./pages/MoviePageTexts";
function App() {
  return (
    <MoviePageTexts
      genres={["Action", "Adventure", "Fantasy"]}
      info={{ length: "⏱ 2HRS 41MINS", lang: "🌐 ENGLISH", type: "☆ 3D,4D,IMAX" }}
      plot={
        "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom."
      }
      ratings={{ imdbRating: 8, rtRating: 84, googleLikes: 81 }}
    />
  );
}

export default App;
