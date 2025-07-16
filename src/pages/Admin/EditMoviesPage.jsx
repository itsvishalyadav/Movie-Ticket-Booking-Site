import React, { useState } from "react";
import "./EditMoviesPage.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller.",
    poster: "https://via.placeholder.com/60x90",
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A journey through space and time.",
    poster: "https://via.placeholder.com/60x90",
  },
];

const EditMoviesPage = () => {
  const {user} = useUser()
  const [movies, setMovies] = useState(mockMovies);
  const [form, setForm] = useState({
    title: "",
    description: "",
    poster: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setMovies((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...form } : m))
      );
    } else {
      setMovies((prev) => [
        ...prev,
        { ...form, id: Date.now(), poster: form.poster || "https://via.placeholder.com/60x90" },
      ]);
    }
    setForm({ title: "", description: "", poster: "" });
    setEditId(null);
  };

  const handleEdit = (movie) => {
    setForm({ title: movie.title, description: movie.description, poster: movie.poster });
    setEditId(movie.id);
  };

  const handleDelete = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    if (editId === id) {
      setForm({ title: "", description: "", poster: "" });
      setEditId(null);
    }
  };

  return (
    <section className="editmovies-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/home">
            <div className="flix-logo">
              Movie <span className="tv">Book</span>
            </div>
          </Link>
          <div className="user-info">
            <div className="user-avatar">
              <span role="img" aria-label="avatar">👤</span>
            </div>
            <div>
              <div className="user-role">Admin</div>
              <div className="user-name">{user.name}</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/add-item">Add Shows</Link></li>
            <li className="active"><Link to="/admin/edit-movies">Edit Movies</Link></li>
            <li><Link to="/admin/edit-cinemas">Edit Cinemas</Link></li>
          </ul>
        </nav>
        <footer className="sidebar-footer">© Movie Book, 2025.</footer>
      </aside>
      <main className="editmovies-main">
        <h2 className="editmovies-title">Edit Movies</h2>
        <form className="editmovies-form" onSubmit={handleSubmit}>
          <label htmlFor="movie-title">Title</label>
          <input id="movie-title" name="title" value={form.title} onChange={handleChange} required placeholder="Enter movie title" />
          <label htmlFor="movie-description">Description</label>
          <textarea id="movie-description" name="description" value={form.description} onChange={handleChange} required placeholder="Enter movie description" />
          <label htmlFor="movie-poster">Poster URL</label>
          <input id="movie-poster" name="poster" value={form.poster} onChange={handleChange} placeholder="Paste poster image URL" />
          <section className="form-actions">
            <button type="submit">{editId ? "Update Movie" : "Add Movie"}</button>
            {editId && (
              <button type="button" onClick={() => { setForm({ title: "", description: "", poster: "" }); setEditId(null); }}>Cancel</button>
            )}
          </section>
        </form>
        <ul className="editmovies-list">
          {movies.map((movie) => (
            <li className="editmovies-list-item" key={movie.id}>
              <section className="movie-info">
                <img src={movie.poster} alt={movie.title} width={60} height={90} style={{ marginRight: 16, borderRadius: 6, objectFit: 'cover', background: '#444' }} />
                <strong>{movie.title}</strong>
                <p>{movie.description}</p>
              </section>
              <section className="movie-actions">
                <button className="edit" type="button" onClick={() => handleEdit(movie)}>Edit</button>
                <button className="delete" type="button" onClick={() => handleDelete(movie.id)}>Delete</button>
              </section>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default EditMoviesPage; 