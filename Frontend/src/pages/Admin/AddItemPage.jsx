import React, { useState } from "react";
import "./AddItemPage.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Layout/SearchBar";
import { useUser } from "../../contexts/userContext";
import CitySelector from "../../components/CitySelector";
import { useEffect } from "react";

const AddItemPage = () => {
  const { user } = useUser();
  const [city, setCity] = useState();
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [showTheatreSuggestions, setShowTheatreSuggestions] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMovieSuggestions, setShowMovieSuggestions] = useState(false);
  const [form, setForm] = useState({
    title: "",
    showTime: "",
    showDate: "",
    theatre: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      city,
      title: {
        _id: form.title._id,
        title: form.title.title,
      },
    };

    await fetch("https://getmyseatbackend.onrender.com/api/shows", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // reset
    setForm({
      title: "",
      showTime: "",
      showDate: "",
      theatre: "",
    });
  };

  useEffect(() => {
    const getTheatres = async () => {
      const data = await fetch(
        `https://getmyseatbackend.onrender.com/api/theatres/${city}`
      );
      setTheatres(await data.json());
    };
    city && getTheatres();
  }, [city]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetch(
        "https://getmyseatbackend.onrender.com/api/movies"
      );
      setMovies(await data.json());
    };
    getMovies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".title-input")) {
        setShowTheatreSuggestions(false);
        setShowMovieSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="additem-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/home">
            <div className="flix-logo">GetMySeat</div>
          </Link>

          <div className="user-info">
            <div className="user-avatar">
              {" "}
              <span role="img" aria-label="avatar">
                👤
              </span>{" "}
            </div>
            <div>
              <div className="user-role">Admin</div>
              <div className="user-name">{user.name}</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/add-item">Add Shows</Link>
            </li>
            <li>
              <Link to="/admin/edit-movies">Edit Movies</Link>
            </li>
            <li>
              <Link to="/admin/edit-cinemas">Edit Cinemas</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">© Movie Book, 2025.</div>
      </aside>
      <main className="additem-main">
        <h1 className="addshow-title">Add ShowTime</h1>
        <form className="additem-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-fields">
              <h3 className="section-title">Movie Details</h3>

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={
                    typeof form.title === "string"
                      ? form.title
                      : form.title.title || ""
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setForm((prev) => ({ ...prev, title: inputValue }));
                    setShowMovieSuggestions(true);
                  }}
                  className="input title-input"
                  autoComplete="off"
                  required
                />

                {showMovieSuggestions &&
                  typeof form.title === "string" &&
                  form.title.trim() && (
                    <ul
                      className="movie-suggestion-box"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        zIndex: 10,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    >
                      {movies.length > 0 ? (
                        movies
                          .filter((movie) =>
                            movie.title
                              .toLowerCase()
                              .includes(form.title.toLowerCase())
                          )
                          .map((movie, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setForm((prev) => ({ ...prev, title: movie }));
                                setShowMovieSuggestions(false);
                              }}
                              style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                color: "#000",
                              }}
                            >
                              {movie.title}
                            </li>
                          ))
                      ) : (
                        <li style={{ padding: "8px", color: "#888" }}>
                          No movies found
                        </li>
                      )}
                    </ul>
                  )}
              </div>

              <div className="city-selector" style={{ position: "relative" }}>
                <button
                  className="city-btn"
                  style={{
                    minWidth: 120,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "#1E1E1E",
                    color: "#fff",
                    marginBottom: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={() => setShowCitySelector((v) => !v)}
                >
                  {city ? city : "Select City"}
                </button>
                {showCitySelector && (
                  <div
                    style={{ position: "absolute", zIndex: 100, top: "110%" }}
                  >
                    <CitySelector
                      onSelect={(c) => {
                        setCity(c.name);
                        console.log(c.name);
                        setShowCitySelector(false);
                      }}
                      selectedCityId={null}
                      placeholder="Search city..."
                      style={{ width: 260 }}
                    />
                  </div>
                )}
              </div>

              <h3 className="section-title">Theatre</h3>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="theatre"
                  placeholder="Theatre"
                  value={form.theatre}
                  onChange={(e) => {
                    handleChange(e);
                    setShowTheatreSuggestions(true); // Show suggestions while typing
                  }}
                  className="input title-input"
                  autoComplete="off"
                  required
                />
                {form.theatre && showTheatreSuggestions && (
                  <ul
                    className="theatre-suggestion-box"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      zIndex: 10,
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {theatres
                      .filter((t) =>
                        t.toLowerCase().includes(form.theatre.toLowerCase())
                      )
                      .map((t, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setForm((prev) => ({ ...prev, theatre: t }));
                            setShowTheatreSuggestions(false);
                          }}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            backgroundColor: "#fff",
                            color: "#000",
                          }}
                        >
                          {t}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div className="show-timings">
                <div className="show-date">
                  <label htmlFor="showDate">Show Date</label>
                  <br></br>
                  <input
                    type="date"
                    id="showDate"
                    name="showDate"
                    value={form.showDate}
                    onChange={handleChange}
                    className="input showDate"
                    required
                  />
                </div>
                <div className="show-time">
                  <label htmlFor="showTiming">Show Time</label>
                  <br></br>
                  <input
                    type="time"
                    id="showTiming"
                    name="showTime"
                    value={form.showTime}
                    onChange={handleChange}
                    className="input showTiming"
                    required
                  />
                </div>
              </div>

              <button className="publish-btn" type="submit">
                PUBLISH
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddItemPage;
