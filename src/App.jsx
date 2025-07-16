import "./App.css";
import { Routes , Route , Navigate} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/User/Login";
import MoviePage from "./pages/Movie/MoviePage";
import Signup from "./pages/User/Signup.jsx";
import BookingPage from "./pages/Booking/BookingPage";
import AddItemPage from "./pages/Admin/AddItemPage";
import Verify from "./pages/User/verify";
import Bookings from "./pages/User/Bookings.jsx"
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditMoviesPage from "./pages/Admin/EditMoviesPage";
import EditCinemasPage from "./pages/Admin/EditCinemasPage";
import { CityProvider , useCity } from "./contexts/CityContext.jsx";
import { UserProvider, useUser } from "./contexts/userContext.jsx";

function ProtectedRoute({ children }) {
  const { user , loading} = useUser();
  if(loading){
    return <p>loading...</p>
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App(){
  return (
    <UserProvider>
      <CityProvider>
        <Routes>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/verify" element={<Verify/>}></Route>
          <Route path="/movie/:title" element={<MoviePage/>}></Route>
          <Route path="/movie/:title/booking" element={<ProtectedRoute>
            <BookingPage/>
          </ProtectedRoute>}></Route>
          <Route path="/admin/add-item" element={<AddItemPage/>}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/admin/edit-movies" element={<EditMoviesPage/>}></Route>
          <Route path="/admin/edit-cinemas" element={<EditCinemasPage/>}></Route>
          <Route path="/bookings" element={<Bookings></Bookings>}></Route>
        </Routes>
      </CityProvider>
    </UserProvider>  
  );
}

export default App;