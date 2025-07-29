import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import SideBar from "../User/SideBar";
import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/userContext";
<<<<<<< HEAD
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "../../pages/Search/SearchResults";
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
import {
  MapPin,
  ChevronDown,
  Search,
  Ticket,
  Tag,
  User2,
  Menu,
  X,
} from "lucide-react";
import styles from "./Header.module.css";
import CitySelector from "../CitySelector";

<<<<<<< HEAD
export default function Header({ nonSticky = false}) {
  const location = useLocation();
  const {city , setCity} = useCity();
  const {user} = useUser();
=======
// import SearchResults from "../../pages/Search/SearchResults";

export default function Header({ nonSticky = false }) {
  const { city, setCity } = useCity();
  const { user } = useUser();
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  // const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const navigate = useNavigate();
  const [showCitySelector, setShowCitySelector] = useState(false);

  async function handleprofile() {
    if (!user) {
      return navigate("/login");
    }
    setShowProfile((curr) => {
      return !curr;
    });
  }

  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSearchOverlay(value.length > 0);
  };

  const handleCloseSearch = () => {
    setQuery("");
    setShowSearchOverlay(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${nonSticky ? styles.nonSticky : ""}`}
      >
        {/* ---------- Left: Logo + City ---------- */}
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            GetMySeat
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
              <div
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: "110%",
                  left: 0,
                }}
              >
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
            onChange={handleSearchChange}
          />
          {query && (
            <button
              type="button"
              className={styles.searchCancel}
              onClick={handleCloseSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </form>

        {/* Search Overlay */}
        {showSearchOverlay && (
          <div className={styles.searchOverlay} onClick={handleCloseSearch}>
            <div
              className={styles.searchOverlayContent}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchResults parameter={query} onClose={handleCloseSearch} />
            </div>
          </div>
        )}

        {/* ---------- Right: Nav + Profile ---------- */}
        {user ? (
          <>
            <nav
              className={`${styles.right} ${
                mobileOpen ? styles.rightOpen : ""
              }`}
            >
              <Link to="/bookings" className={styles.navItem}>
                <Ticket size={18} /> <span>My Bookings</span>
              </Link>
              <Link to="/offers" className={styles.navItem}>
                <Tag size={18} /> <span>Offers</span>
              </Link>
              <button
                className={styles.profile}
                aria-label="Profile"
                onClick={handleprofile}
              >
                <User2 size={20} />
              </button>
            </nav>

<<<<<<< HEAD
      {/* ---------- Burger (mobile) ---------- */}
      <button
        className={styles.burger}
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((p) => !p)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      </>) : (
      <div className={styles.authButtons}>
        <Link to="/login" state={{ from: location }} replace><div className={styles.navLoginBtn}>Login</div></Link>
        <Link to="/signup" state={{ from: location }} replace><div className={styles.navSignupBtn}>Signup</div></Link>
      </div>
=======
            {/* ---------- Burger (mobile) ---------- */}
            <button
              className={styles.burger}
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((p) => !p)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login">
              <div className={styles.navLoginBtn}>Login</div>
            </Link>
            <Link to="/signup">
              <div className={styles.navSignupBtn}>Signup</div>
            </Link>
          </div>
        )}
      </header>
      {showProfile && user && (
        <SideBar username={user.username} name={user.name}></SideBar>
>>>>>>> 4bc47d42b5045274af0499fb0c58e79a1092b561
      )}
    </>
  );
}
