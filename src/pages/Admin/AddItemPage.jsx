import React, { useState } from "react";
import "./AddItemPage.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Layout/SearchBar";
import { useUser } from "../../contexts/userContext";

const AddItemPage = () => {
  const {user} = useUser();
  const [form, setForm] = useState({
    title: "",
    showTime: "",
    showDate : "",
    theatreId : "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/shows", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });
    setForm({
      title: "",
      showTime: "",
      showDate : "",
      theatreId : "",
    })
  };

  
  return (
    <div className="additem-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/home">
            <div className="flix-logo">
              Movie <span className="tv">Book</span>
            </div>
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

              <SearchBar
                placeholder="Search Movie"
                onSelectMovie={(movie) =>
                  setForm((prev) => ({
                    ...prev,
                    movie,
                    title: movie.title || "",
                    description: movie.overview || "",
                  }))
                }
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="input title-input"
                required
              />
              <h3 className="section-title">Theatre ID</h3>
              <input
                type="text"
                name="theatreId"
                placeholder="Theatre"
                value={form.theatreId}
                onChange={handleChange}
                className="input title-input"
                required
              />
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
