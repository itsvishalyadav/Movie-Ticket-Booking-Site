import "./App.css";
import BookingPage from "./pages/BookingPage";
import MoviePageTexts from "./pages/MoviePageTexts";
import tileImage from "./assets/movieTile.jpeg";
import bgImage from "./assets/blackPanther.png";
import Header from "./components/Header";
import bgImagePhone from "./assets/bgImagePhone.webp";
import bgImage1 from "./assets/bgImage1.jpg";

function App() {
  let movieInfo = {
    movieFirstName: "Black Panther: ",
    movieLastName: "Wakanda Forever",
    title: "Black Panther: Wakanda Forever",
    movieTile: tileImage,
    bgImage: bgImage,
    bgImage1: bgImage1,
    bgImagePhone: bgImagePhone,
    genres: ["Action", "Adventure", "Fantasy"],
    length: "2H 41M",
    languages: ["Hindi", "English"],
    format: ["3D", "4D", "IMAX"],
    director: "Ryan Coogler",
    year: 2022,
    cast: [
      "Letitia Wright",
      "Lupita Nyong'o",
      "Danai Gurira",
      "Winston Duke",
      "Angela Bassett",
      "Tenoch Huerta",
      "Dominique Thorne",
      "Michaela Coel",
      "Mabel Cadena",
      "Alex Livinalli",
      "Martin Freeman",
      "Florence Kasumba",
      "Isaach de Bankolé",
      "Dorothy Steel",
      "Danny Sapani",
    ],
    country: "USA",
    plot: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom.",
    ratings: { imdbRating: 8, rtRating: 84, googleLikes: 81 },
  };
  let liveInfo = {
    timings: ["09:45 AM", "12:30 PM", "03:15 PM", "06:15 PM"],
    theaters: ["Vaishali Nagar", "Sector 17", "City Cinema"],
  };
  return (
    <div>
      {/* <div className="background-wrapper">
        <Header />
        <MoviePageTexts info={movieInfo} />
      </div> */}
      <div className="booking-page-wrapper">
        <Header nonSticky />
        <BookingPage info={movieInfo} liveInfo={liveInfo} />
      </div>
    </div>
  );
}

export default App;
