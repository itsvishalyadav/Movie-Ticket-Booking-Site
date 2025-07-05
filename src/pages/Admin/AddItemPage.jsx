import React, { useState } from "react";
import "./AddItemPage.css";

const AddItemPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseYear: "",
    runningTime: "",
    fullHD: "",
    age: "",
    country: "",
    genre: "",
    itemType: "Movie",
    video: null,
    videoLink: "",
    cover: null,
    photos: null,
  });
  const [pagesOpen, setPagesOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleRadio = (e) => {
    setForm((prev) => ({ ...prev, itemType: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for submit logic
    alert("Publish clicked! (Form data not actually submitted)");
  };

  const togglePages = () => setPagesOpen((open) => !open);

  return (
    <div className="additem-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="flix-logo">Movie <span className="tv">Book</span></div>
          <div className="user-info">
            <div className="user-avatar"> <span role="img" aria-label="avatar">👤</span> </div>
            <div>
              <div className="user-role">Admin</div>
              <div className="user-name">John Doe</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Catalog</a></li>
            <li className="nav-section">
              <a href="#" onClick={e => { e.preventDefault(); togglePages(); }} style={{display:'flex',alignItems:'center',gap:'6px',userSelect:'none'}}>
                <span style={{transition:'transform 0.2s',display:'inline-block',transform: pagesOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}>&#9654;</span>
                Pages
              </a>
              {pagesOpen && (
                <ul>
                  <li className="active"><a href="#">Add item</a></li>
                  <li><a href="#">Edit user</a></li>
                  <li><a href="#">Sign in</a></li>
                  <li><a href="#">Sign up</a></li>
                  <li><a href="#">Forgot password</a></li>
                  <li><a href="#">404 page</a></li>
                </ul>
              )}
            </li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Comments</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div>© FlixTV.template, 2021.<br/>Create by Dmitry Volkov</div>
        </div>
      </aside>
      <main className="additem-main">
        <h1>Add new item</h1>
        <form className="additem-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="cover-upload">
              <label htmlFor="cover-upload-input" className="cover-upload-label">
                {form.cover ? form.cover.name : "Upload cover (190 × 270)"}
                <input
                  id="cover-upload-input"
                  name="cover"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-fields">
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
              <div className="row-fields">
                <input
                  type="text"
                  name="releaseYear"
                  placeholder="Release year"
                  value={form.releaseYear}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="runningTime"
                  placeholder="Running timed in minute"
                  value={form.runningTime}
                  onChange={handleChange}
                  className="input"
                />
                <select
                  name="fullHD"
                  value={form.fullHD}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">FullHD</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div className="row-fields">
                <input
                  type="text"
                  name="country"
                  placeholder="Choose country / countries"
                  value={form.country}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="genre"
                  placeholder="Choose genre / genres"
                  value={form.genre}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div className="upload-photos">
                <label htmlFor="photos-upload-input" className="photos-upload-label">
                  Upload photos
                  <input
                    id="photos-upload-input"
                    name="photos"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="item-type-row">
                <span>Item type:</span>
                <label>
                  <input
                    type="radio"
                    name="itemType"
                    value="Movie"
                    checked={form.itemType === "Movie"}
                    onChange={handleRadio}
                  />
                  Movie
                </label>
                <label>
                  <input
                    type="radio"
                    name="itemType"
                    value="TV Show"
                    checked={form.itemType === "TV Show"}
                    onChange={handleRadio}
                  />
                  TV Show
                </label>
              </div>
              <div className="row-fields">
                <label className="upload-video-label">
                  Upload video
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </label>
                <input
                  type="text"
                  name="videoLink"
                  placeholder="or add a link"
                  value={form.videoLink}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <button className="publish-btn" type="submit">PUBLISH</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddItemPage; 