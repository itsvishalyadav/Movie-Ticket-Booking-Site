import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import Login from "./pages/User/Login";
import MoviePage from "./pages/Movie/MoviePage";
import Signup from "./pages/User/Signup.jsx";
import BookingPage from "./pages/Booking/BookingPage";
import SearchResults from "./pages/Search/SearchResults";
import AddItemPage from "./pages/Admin/AddItemPage";
import Verify from "./pages/User/verify";
import Bookings from "./pages/User/Bookings.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditMoviesPage from "./pages/Admin/EditMoviesPage";
import EditCinemasPage from "./pages/Admin/EditCinemasPage";
import ThankYouPage from "./pages/Booking/ThankYouPage";
import { CityProvider, useCity } from "./contexts/CityContext.jsx";
import About from "./pages/footer/About";
import Services from "./pages/footer/Services";
import Privacy from "./pages/footer/Privacy";
import Terms from "./pages/footer/Terms";
import FAQ from "./pages/footer/FAQ";
import Contact from "./pages/footer/Contact";
import ShowTimePage from "./pages/Booking/ShowTimePage.jsx";
import { UserProvider, useUser } from "./contexts/userContext.jsx";
import ShippingPolicy from "./pages/footer/ShippingPolicy";
import RefundPolicy from "./pages/footer/RefundPolicy";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) {
    return <p>loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <UserProvider>
      <CityProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/movie/:title" element={<MoviePage />}></Route>
          <Route path="/movie/:title/shows" element={<ShowTimePage />}></Route>
          <Route
            path="/movie/:title/booking/:showId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/admin/add-item" element={<AddItemPage />}></Route>
          <Route path="/search/:parameter" element={<SearchResults />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/admin/edit-movies" element={<EditMoviesPage />}></Route>
          <Route
            path="/admin/edit-cinemas"
            element={<EditCinemasPage />}
          ></Route>
          <Route path="/bookings" element={<Bookings></Bookings>}></Route>
          <Route
            path="/thank-you"
            element={<ThankYouPage />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/faq" element={<FAQ />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </CityProvider>
    </UserProvider>
  );
}

export default App;
