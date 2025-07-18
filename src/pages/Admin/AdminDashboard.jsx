import React, { useState } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import CitySelector from "../../components/CitySelector";

const mockShows = [
  {
    id: 1,
    movie: "Inception",
    cinema: "PVR Cinemas",
    showtime: "2024-06-10 19:00",
  },
  {
    id: 2,
    movie: "Interstellar",
    cinema: "INOX",
    showtime: "2024-06-10 21:30",
  },
];

const AdminDashboard = () => {
  const [city, setCity] = useState("");
  const [showCitySelector, setShowCitySelector] = useState(false);
  const {user} = useUser();
  return (
    <>
      <section className="admindashboard-root">
        <aside className="sidebar">
          <div className="sidebar-header">
            <Link to="/home">
              <div className="flix-logo">
                Movie <span className="tv">Book</span>
              </div>
            </Link>
            <div className="user-info">
              <div className="user-avatar">
                <span role="img" aria-label="avatar">
                  👤
                </span>
              </div>
              <div>
                <div className="user-role">Admin</div>
                <div className="user-name">John Doe</div>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="active">
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
          <footer className="sidebar-footer">© Movie Book, 2025.</footer>
        </aside>
        <main className="admindashboard-main">
          <h2 className="admindashboard-title">Admin Dashboard</h2>
          <div className="city-selector" style={{ position: "relative" }}>
            <button
              className="city-btn"
              style={{ minWidth: 120, padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: '#1E1E1E', color: '#fff', marginBottom: 8, cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setShowCitySelector((v) => !v)}
            >
              {city ? city : "Select City"}
            </button>
            {showCitySelector && (
              <div style={{ position: "absolute", zIndex: 100, top: "110%" }}>
                <CitySelector
                  onSelect={(c) => {
                    setCity(c.name);
                    setShowCitySelector(false);
                  }}
                  selectedCityId={null}
                  placeholder="Search city..."
                  style={{ width: 260 }}
                />
              </div>
            )}
          </div>
          <ul className="dashboard-cards">
            {mockShows.map((show) => (
              <li className="dashboard-card" key={show.id}>
                <h3>{show.movie}</h3>
                <p>
                  <strong>Cinema:</strong> {show.cinema}
                </p>
                <p>
                  <strong>Showtime:</strong> {show.showtime}
                </p>
              </li>
            ))}
          </ul>
        </main>
      </section>
    </>
  );
};

export default AdminDashboard;
