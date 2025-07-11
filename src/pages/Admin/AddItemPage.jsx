import React, { useState } from "react";
import "./AddItemPage.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Layout/SearchBar";

const AddItemPage = () => {
  const [form, setForm] = useState({
    movie: {},
    title: "",
    theaterName: "",
    theaterLocation: "",
    showTiming: "",
    seatingRows: "",
    seatingColumns: "",
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
    // Placeholder for submit logic
    alert("Publish clicked! (Form data not actually submitted)");
  };

  const handleSeatTypeChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const seatTypes = prev.seatTypes.map((type, i) =>
        i === idx ? { ...type, [name]: value } : type
      );
      return { ...prev, seatTypes };
    });
  };
  const addSeatType = () => {
    setForm((prev) => ({
      ...prev,
      seatTypes: [...prev.seatTypes, { name: "", price: "", number: "" }],
    }));
  };
  const removeSeatType = (idx) => {
    setForm((prev) => ({
      ...prev,
      seatTypes: prev.seatTypes.filter((_, i) => i !== idx),
    }));
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
              <a href="#">Dashboard</a>
            </li>

            <li className="active">
              <Link to="/admin/add-item">Add item</Link>
            </li>
            <li>
              <a href="#">Users</a>
            </li>
            <li>
              <a href="#">Comments</a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">© Movie Book, 2025.</div>
      </aside>
      <main className="additem-main">
        <h1>Add new item</h1>
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
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="input description-input"
                required
              />
              <h3 className="section-title">Theater Details</h3>
              <input
                type="text"
                name="theaterName"
                placeholder="Theater Name"
                value={form.theaterName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="text"
                name="theaterLocation"
                placeholder="Location"
                value={form.theaterLocation}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="time"
                name="showTiming"
                placeholder="Show Timing"
                value={form.showTiming}
                onChange={handleChange}
                className="input"
                required
              />
              <div className="row-fields">
                <input
                  type="number"
                  name="seatingRows"
                  placeholder="Rows"
                  value={form.seatingRows}
                  onChange={handleChange}
                  className="input"
                  min="1"
                  required
                />
                <input
                  type="number"
                  name="seatingColumns"
                  placeholder="Columns"
                  value={form.seatingColumns}
                  onChange={handleChange}
                  className="input"
                  min="1"
                  required
                />
              </div>
              <div className="seat-types-section">
                <label className="seat-types-label">Seat Types</label>
                {form.seatTypes.map((type, idx) => (
                  <div className="row-fields seat-type-row" key={idx}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Type (e.g. VIP)"
                      value={type.name}
                      onChange={(e) => handleSeatTypeChange(idx, e)}
                      className="input"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={type.price}
                      onChange={(e) => handleSeatTypeChange(idx, e)}
                      className="input"
                      min="0"
                      required
                    />
                    <input
                      type="number"
                      name="number"
                      placeholder="# Seats"
                      value={type.number}
                      onChange={(e) => handleSeatTypeChange(idx, e)}
                      className="input"
                      min="1"
                      required
                    />
                    {form.seatTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSeatType(idx)}
                        className="remove-seat-type-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSeatType}
                  className="add-seat-type-btn"
                >
                  Add Seat Type
                </button>
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
