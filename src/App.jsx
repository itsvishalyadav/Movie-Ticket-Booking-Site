import "./App.css";
import { Routes , Route , useParams} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/User/Login";
import MoviePage from "./pages/Movie/MoviePage";
import Signup from "./pages/User/signup";
import BookingPage from "./pages/Booking/BookingPage";
import Verify from "./pages/User/verify";
import { CityProvider , useCity } from "./contexts/CityContext.jsx";
function App(){
  return (
    <CityProvider>
      <Routes>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/verify" element={<Verify/>}></Route>
        <Route path="/movie/:title" element={<MoviePage/>}></Route>
        <Route path="/movie/:title/booking" element={<BookingPage/>}></Route>
      </Routes>
    </CityProvider>
  );
}

export default App;