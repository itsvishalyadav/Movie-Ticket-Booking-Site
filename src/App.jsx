import "./App.css";
import { Routes , Route , useParams} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/User/Login";
import MoviePage from "./pages/Movie/MoviePage";
import BookingPage from "./pages/Booking/BookingPage";
import AddItemPage from "./pages/Admin/AddItemPage";
import Signup from "./pages/User/signup";

function App(){
  return (
    <Routes>
      <Route path="/home" element={<HomePage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/movie/:title" element={<MoviePage/>}></Route>
      <Route path="/movie/:title/booking" element={<BookingPage/>}></Route>
      <Route path="/admin/add-item" element={<AddItemPage/>}></Route>
    </Routes>
  );
}

export default App;