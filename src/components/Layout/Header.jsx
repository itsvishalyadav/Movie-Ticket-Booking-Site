import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import SideBar from "../User/SideBar";
import { useCity } from "../../contexts/CityContext";
import {
  MapPin,
  ChevronDown,
  Search,
  Ticket,
  Tag,
  User2,
  Menu,
  X,
  Sidebar,
} from "lucide-react";
import styles from "./Header.module.css";
import { searchMovies } from "../../movieApi";
import { useNavigate } from "react-router-dom";
import CitySelector from "../CitySelector";

export default function Header({ nonSticky = false}) {
  const {city , setCity} = useCity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showProfile , setShowProfile] = useState(false);
  const [user , setUser] = useState();
  const navigate = useNavigate();
  const [showCitySelector, setShowCitySelector] = useState(false);

  useEffect(() => {
    const checkUser = async() => {
      const res = await fetch("http://localhost:8080/api/isLoggedIn" , {credentials : "include"});
      const data = await res.json();
      if(data.user){
        setUser(data.user);
      }
      else{
        setUser();
      }
    };
    checkUser();
  });

  // console.log(user);

  async function handleprofile(){
    if(!user){
      return navigate("/login");
    }
    setShowProfile((curr) =>{
      return !curr;
    })
  }


  // limit the api calls while searching movies
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        searchMovies(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <>
    <header className={`${styles.header} ${nonSticky ? styles.nonSticky : ''}`}>
      {/* ---------- Left: Logo + City ---------- */}
      <div className={styles.left}>
        <a href="/" className={styles.logo}>
          Movie<span>Book</span>
        </a>

        {/* City Selector with search */}
        <div style={{ position: "relative" }}>
          <button
            className={styles.cityTrigger}
            aria-label="Select your city"
            onClick={() => setShowCitySelector((v) => !v)}
            style={{ minWidth: 120 }}
          >
            <MapPin size={16} />
            <span>{city || "Select city"}</span>
            <ChevronDown size={16} className={styles.cityChevron} />
          </button>
          {showCitySelector && (
            <div style={{ position: "absolute", zIndex: 100, top: "110%", left: 0 }}>
              <CitySelector
                onSelect={(c) => {
                  setCity(c.name);
                  localStorage.setItem("city", c.name);
                  setShowCitySelector(false);
                }}
                selectedCityId={null}
                placeholder="Search city..."
                style={{ width: 260 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------- Center: Search ---------- */}
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Movies, cinemas...."
          className={styles.searchInput}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          onFocus={() => query && setShowResults(true)}
        />
        {showResults && results.length > 0 && (
          <div className={styles.searchResults}>
            {results.map(movie => (
              <div
                key={movie.id}
                className={styles.searchResultItem}
                onMouseDown={() => {
                  navigate(`/movie/${movie.title}`);
                  setShowResults(false);
                  setQuery("");
                }}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.resultPoster}
                  />
                )}
                <span>{movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}</span>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* ---------- Right: Nav + Profile ---------- */}
      <nav className={`${styles.right} ${mobileOpen ? styles.rightOpen : ""}`}>
        <a href="#" className={styles.navItem}>
          <Ticket size={18} /> <span>My Bookings</span>
        </a>
        <a href="#" className={styles.navItem}>
          <Tag size={18} /> <span>Offers</span>
        </a>
        <button className={styles.profile} aria-label="Profile" onClick={handleprofile}>
          <User2 size={20} />
        </button>
      </nav>

      {/* ---------- Burger (mobile) ---------- */}
      <button
        className={styles.burger}
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((p) => !p)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
    {showProfile && user && <SideBar username = {user.username} name = {user.name}></SideBar>}
    </>
  );
} 