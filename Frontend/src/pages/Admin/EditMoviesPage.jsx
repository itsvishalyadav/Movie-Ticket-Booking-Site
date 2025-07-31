import React, { useState , useEffect} from "react";
import "./EditMoviesPage.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import ErrorMessage from "../../components/Error/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const EditMoviesPage = () => {
  const { user , loading} = useUser();
  const [error, setError] = useState();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    poster: "",
    bgImage: "",
    genres: "",
    director: "",
    cast: "",
    duration: "",
    releaseDate: "",
    language: "",
    ratings: {
      imdbRating: "",
      rottenTomatoesRating: "",
    },
    trailer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      // Handle nested objects like ratings
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        {
          ...form,
          id: Date.now(),
          poster: form.poster || "https://via.placeholder.com/60x90",
        },
      ]);
    }
    setForm({
      title: "",
      description: "",
      poster: "",
      bgImage: "",
      genres: "",
      director: "",
      cast: "",
      duration: "",
      releaseDate: "",
      language: "",
      ratings: {
        imdbRating: "",
        rottenTomatoesRating: "",
      },
      trailer: "",
    });
    setEditId(null);
  };

  return (
    error ? (
      <ErrorMessage message={error} />
      ) : (
    <section className="editmovies-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/">
            <div className="flix-logo">GetMySeat</div>
          </Link>
          <div className="user-info">
            <div className="user-avatar">
              <span role="img" aria-label="avatar">
                👤
              </span>
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
            <li className="active">
              <Link to="/admin/edit-movies">Edit Movies</Link>
            </li>
            <li>
              <Link to="/admin/edit-cinemas">Edit Cinemas</Link>
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer">© GetMySeat, 2025.</footer>
      </aside>
      <main className="editmovies-main">
        <h1 className="editmovies-title">Edit Movies</h1>
        <form className="editmovies-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <label htmlFor="movie-title">Title</label>
            <input
              id="movie-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter movie title"
            />

            <label htmlFor="movie-description">Description</label>
            <textarea
              id="movie-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Enter movie description"
              rows="4"
            />

            <label htmlFor="movie-genres">Genres</label>
            <input
              id="movie-genres"
              name="genres"
              value={form.genres}
              onChange={handleChange}
              required
              placeholder="Enter genres (comma-separated)"
            />

            <div className="form-row">
              <div className="form-col">
                <label htmlFor="movie-duration">Duration (minutes)</label>
                <input
                  id="movie-duration"
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  placeholder="Enter duration"
                />
              </div>
              <div className="form-col">
                <label htmlFor="movie-language">Language</label>
                <input
                  id="movie-language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  required
                  placeholder="Enter language"
                />
              </div>
            </div>

            <label htmlFor="movie-releaseDate">Release Date</label>
            <input
              id="movie-releaseDate"
              name="releaseDate"
              type="date"
              value={form.releaseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Cast & Crew</h3>
            <label htmlFor="movie-director">Director</label>
            <input
              id="movie-director"
              name="director"
              value={form.director}
              onChange={handleChange}
              required
              placeholder="Enter director name"
            />

            <label htmlFor="movie-cast">Cast</label>
            <textarea
              id="movie-cast"
              name="cast"
              value={form.cast}
              onChange={handleChange}
              required
              placeholder="Enter cast members (comma-separated)"
              rows="3"
            />
          </div>

          <div className="form-section">
            <h3>Media</h3>
            <label htmlFor="movie-poster">Poster URL</label>
            <input
              id="movie-poster"
              name="poster"
              value={form.poster}
              onChange={handleChange}
              required
              placeholder="Paste poster image URL"
            />

            <label htmlFor="movie-bgImage">Background Image URL</label>
            <input
              id="movie-bgImage"
              name="bgImage"
              value={form.bgImage}
              onChange={handleChange}
              required
              placeholder="Paste background image URL"
            />

            <label htmlFor="movie-trailer">Trailer URL</label>
            <input
              id="movie-trailer"
              name="trailer"
              value={form.trailer}
              onChange={handleChange}
              required
              placeholder="Paste trailer URL"
            />
          </div>

          <div className="form-section">
            <h3>Ratings</h3>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="movie-imdbRating">IMDB Rating</label>
                <input
                  id="movie-imdbRating"
                  name="ratings.imdbRating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={form.ratings.imdbRating}
                  onChange={handleChange}
                  placeholder="Enter IMDB rating"
                />
              </div>
              <div className="form-col">
                <label htmlFor="movie-rottenTomatoesRating">
                  Rotten Tomatoes Rating
                </label>
                <input
                  id="movie-rottenTomatoesRating"
                  name="ratings.rottenTomatoesRating"
                  type="number"
                  min="0"
                  max="100"
                  value={form.ratings.rottenTomatoesRating}
                  onChange={handleChange}
                  placeholder="Enter Rotten Tomatoes rating"
                />
              </div>
            </div>
          </div>
          <section className="form-actions">
            <button type="submit">
              {editId ? "Update Movie" : "Add Movie"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm({ title: "", description: "", poster: "" });
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </section>
        </form>
      </main>
    </section>
  )
  );
};

export default EditMoviesPage;
