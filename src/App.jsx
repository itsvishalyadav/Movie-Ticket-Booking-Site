import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import BookingPage from "./pages/BookingPage";
import MoviePageTexts from "./pages/MoviePageTexts";
import AddItemPage from "./pages/AddItemPage";
import { getMoviesUrl, getMovieDetails, POPULAR_URL } from "./movieApi";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import { Routes, Route, Link } from 'react-router-dom';
import MoviePage from "./pages/MoviePage";

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/movie" element={<MoviePage/>}/>
    </Routes>
  );
}

export default App;
