import React, { useState } from "react";
import "./AddItemPage.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Layout/SearchBar";

const AddItemPage = () => {
  const [form, setForm] = useState({
    movie: {},
    title: "",
    cinema: {},
    showTiming: "",
    seatTypes: [{ name: "", price: "", number: "" }],
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
    alert("Publish clicked! (Form data not actually submitted)");
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
              <div className="user-name">John Doe</div>
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
              <h3 className="section-title">Cinema & Show Details</h3>
              <SearchBar
                placeholder="Search Cinema"
                onSelectMovie={() => {}}
              />
              <label>Show Timing</label>
              <input
                type="time"
                id="showTiming"
                name="showTiming"
                value={form.showTiming}
                onChange={handleChange}
                className="input"
                required
              />
              

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
