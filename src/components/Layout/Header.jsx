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

export default function Header({ nonSticky = false}) {
  const {city , setCity} = useCity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showProfile , setShowProfile] = useState(false);
  const [user , setUser] = useState();
  const navigate = useNavigate();

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

  // Fetch movies from TMDB via movieApi
  React.useEffect(() => {
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

        {/* Radix Select for city */}
        <Select.Root defaultValue={city} onValueChange = {(value) => {
          localStorage.setItem("city" , value);
          setCity(value);
        }}>
          <Select.Trigger
            className={styles.cityTrigger}
            aria-label="Select your city"
          >
            <MapPin size={16} />
            <Select.Value placeholder="Select city" />
            <Select.Icon className={styles.cityChevron}>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              side="bottom"
              position="popper"
              className={styles.cityContent}
            >
              <Select.Viewport className={styles.cityViewport}>
                {[
                  ["Delhi", "New Delhi"],
                  ["Mumbai", "Mumbai"],
                  ["Bangalore", "Bangalore"],
                  ["Hyderabad", "Hyderabad"],
                ].map(([value, label]) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className={styles.cityItem}
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* ---------- Center: Search ---------- */}
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Movies, cinemas, shows…"
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
                  navigate(`/movie/${movie.id}`);
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