import React, { useState } from "react";
import "./AdminShared.css";
import "./EditCinemasPage.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const mockCinemas = [
  { id: 1, name: "PVR Cinemas", location: "Connaught Place, Delhi" },
  { id: 2, name: "INOX", location: "Phoenix Mall, Mumbai" },
];

export default function EditCinemasPage() {
  const { user } = useUser();
  const [cinemas, setCinemas] = useState(mockCinemas);
  const [form, setForm] = useState({
    name: "",
    location: "",
    theaters: [
      { theaterNo: "", seatTypes: [{ name: "", price: "", number: "" }] },
    ],
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTheaterChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.map((t, i) =>
        i === idx ? { ...t, [name]: value } : t
      ),
    }));
  };

  const addTheater = () =>
    setForm((prev) => ({
      ...prev,
      theaters: [
        ...prev.theaters,
        { theaterNo: "", seatTypes: [{ name: "", price: "", number: "" }] },
      ],
    }));

  const removeTheater = (idx) =>
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.filter((_, i) => i !== idx),
    }));

  const handleSeatTypeChange = (tIdx, sIdx, e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.map((t, i) => {
        if (i !== tIdx) return t;
        return {
          ...t,
          seatTypes: t.seatTypes.map((st, j) =>
            j === sIdx ? { ...st, [name]: value } : st
          ),
        };
      }),
    }));
  };

  const addSeatType = (tIdx) =>
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.map((t, i) =>
        i === tIdx
          ? {
              ...t,
              seatTypes: [...t.seatTypes, { name: "", price: "", number: "" }],
            }
          : t
      ),
    }));

  const removeSeatType = (tIdx, sIdx) =>
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.map((t, i) =>
        i === tIdx
          ? { ...t, seatTypes: t.seatTypes.filter((_, j) => j !== sIdx) }
          : t
      ),
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setCinemas((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...form } : c))
      );
    } else {
      setCinemas((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({
      name: "",
      location: "",
      theaters: [
        { theaterNo: "", seatTypes: [{ name: "", price: "", number: "" }] },
      ],
    });
    setEditId(null);
  };

  const handleEdit = (cinema) => {
    setForm({
      name: cinema.name,
      location: cinema.location,
      theaters: cinema.theaters,
    });
    setEditId(cinema.id);
  };

  const handleDelete = (id) => {
    setCinemas((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setForm({
        name: "",
        location: "",
        theaters: [
          { theaterNo: "", seatTypes: [{ name: "", price: "", number: "" }] },
        ],
      });
      setEditId(null);
    }
  };

  return (
    <div className="admin-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/admin/dashboard">
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
              <div className="user-name">{user?.name || "Loading..."}</div>
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
            <li className="active">
              <Link to="/admin/edit-cinemas">Edit Cinemas</Link>
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer">© Movie Book, 2025.</footer>
      </aside>

      <main className="editcinemas-main">
        <h2 className="section-title">Edit Cinemas</h2>
        <form className="editcinemas-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="cinema-name">Cinema Name</label>
              <input
                id="cinema-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter cinema name"
                required
                className="input"
              />
            </div>
            <div className="form-col">
              <label htmlFor="cinema-location">Location</label>
              <input
                id="cinema-location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter cinema location"
                required
                className="input"
              />
            </div>
          </div>

          {/* Theaters & Seat Types */}
          <div className="form-section">
            {form.theaters.map((theater, tIdx) => (
              <div key={tIdx} className="form-row theater-row">
                <div className="form-col">
                  <label>Theater #{tIdx + 1}</label>
                  <input
                    type="text"
                    name="theaterNo"
                    placeholder="Theater No."
                    value={theater.theaterNo}
                    onChange={(e) => handleTheaterChange(tIdx, e)}
                    className="input"
                    required
                  />
                  {form.theaters.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeTheater(tIdx)}
                    >
                      Remove Theater
                    </button>
                  )}
                </div>

                <div className="seat-types-section">
                  <label>Seat Types</label>
                  {theater.seatTypes.map((type, sIdx) => (
                    <div className="seat-type-row" key={sIdx}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Type (e.g. VIP)"
                        value={type.name}
                        onChange={(e) => handleSeatTypeChange(tIdx, sIdx, e)}
                        className="input"
                        required
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={type.price}
                        onChange={(e) => handleSeatTypeChange(tIdx, sIdx, e)}
                        className="input"
                        min="0"
                        required
                      />

                      {theater.seatTypes.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeSeatType(tIdx, sIdx)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => addSeatType(tIdx)}
                  >
                    Add Seat Type
                  </button>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addTheater}>
              Add Another Theater
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editId ? "Update Cinema" : "Add Cinema"}
            </button>
            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <ul className="editcinemas-list">
          {cinemas.map((c) => (
            <li key={c.id} className="editcinemas-item">
              <div>
                <strong>{c.name}</strong>
                <p>{c.location}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(c)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
