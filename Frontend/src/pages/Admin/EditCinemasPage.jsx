import React, { useState } from "react";
// import "./AdminShared.css";
import "./EditCinemasPage.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const mockCinemas = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Connaught Place, Delhi",
  },
  {
    id: 2,
    name: "INOX",
    location: "Phoenix Mall, Mumbai",
  },
];

const EditCinemasPage = () => {
  const { user } = useUser();
  const [cinemas, setCinemas] = useState(mockCinemas);
  const [form, setForm] = useState({
    name: "",
    location: "",
    theaters: [
      {
        theaterNo: "",
        seatingRows: "",
        seatingColumns: "",
        seatTypes: [{ name: "", price: "", number: "" }],
      },
    ],
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTheaterChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const theaters = prev.theaters.map((theater, i) =>
        i === idx ? { ...theater, [name]: value } : theater
      );
      return { ...prev, theaters };
    });
  };
  const addTheater = () => {
    setForm((prev) => ({
      ...prev,
      theaters: [
        ...prev.theaters,
        {
          theaterNo: "",
          seatingRows: "",
          seatingColumns: "",
          seatTypes: [{ name: "", price: "", number: "" }],
        },
      ],
    }));
  };
  const removeTheater = (idx) => {
    setForm((prev) => ({
      ...prev,
      theaters: prev.theaters.filter((_, i) => i !== idx),
    }));
  };
  const handleSeatTypeChange = (theaterIdx, seatIdx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const theaters = prev.theaters.map((theater, i) => {
        if (i !== theaterIdx) return theater;
        const seatTypes = theater.seatTypes.map((type, j) =>
          j === seatIdx ? { ...type, [name]: value } : type
        );
        return { ...theater, seatTypes };
      });
      return { ...prev, theaters };
    });
  };
  const addSeatType = (theaterIdx) => {
    setForm((prev) => {
      const theaters = prev.theaters.map((theater, i) =>
        i === theaterIdx
          ? {
              ...theater,
              seatTypes: [
                ...theater.seatTypes,
                { name: "", price: "", number: "" },
              ],
            }
          : theater
      );
      return { ...prev, theaters };
    });
  };
  const removeSeatType = (theaterIdx, seatIdx) => {
    setForm((prev) => {
      const theaters = prev.theaters.map((theater, i) =>
        i === theaterIdx
          ? {
              ...theater,
              seatTypes: theater.seatTypes.filter((_, j) => j !== seatIdx),
            }
          : theater
      );
      return { ...prev, theaters };
    });
  };

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
        {
          theaterNo: "",
          seatingRows: "",
          seatingColumns: "",
          seatTypes: [{ name: "", price: "", number: "" }],
        },
      ],
    });
    setEditId(null);
  };

  const handleEdit = (cinema) => {
    setForm({ name: cinema.name, location: cinema.location });
    setEditId(cinema.id);
  };

  const handleDelete = (id) => {
    setCinemas((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setForm({ name: "", location: "" });
      setEditId(null);
    }
  };

  return (
    <section className="admin-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/home">
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
        <h2 className="editcinemas-title">Edit Cinemas</h2>
        <form className="editcinemas-form" onSubmit={handleSubmit}>
          <h3 className="section-title">Theater Details</h3>
          <label htmlFor="cinema-name">Cinema Name</label>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="cinema-name">Cinema Name</label>
              <input
                id="cinema-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter cinema name"
              />
            </div>
            <div className="form-col">
              <label htmlFor="cinema-location">Location</label>
              <input
                id="cinema-location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Enter cinema location"
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Theaters</h3>
            {form.theaters.map((theater, tIdx) => (
              <div key={tIdx} className="form-row">
                <div className="form-col">
                  <input
                    type="text"
                    name="theaterNo"
                    placeholder="Theater No."
                    value={theater.theaterNo}
                    onChange={(e) => handleTheaterChange(tIdx, e)}
                    className="input"
                    required
                  />
                  <input
                    type="number"
                    name="seatingRows"
                    placeholder="Rows"
                    value={theater.seatingRows}
                    onChange={(e) => handleTheaterChange(tIdx, e)}
                    className="input"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    name="seatingColumns"
                    placeholder="Columns"
                    value={theater.seatingColumns}
                    onChange={(e) => handleTheaterChange(tIdx, e)}
                    className="input"
                    min="1"
                    required
                  />
                  {form.theaters.length > 1 && (
                    <button
                      type="button"
                      className="remove-seat-type-btn"
                      onClick={() => removeTheater(tIdx)}
                    >
                      Remove Theater
                    </button>
                  )}
                </div>
                <div className="seat-types-section">
                  <label className="seat-types-label">Seat Types</label>
                  {theater.seatTypes.map((type, sIdx) => (
                    <div className="row-fields seat-type-row" key={sIdx}>
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
                      <input
                        type="number"
                        name="number"
                        placeholder="# Seats"
                        value={type.number}
                        onChange={(e) => handleSeatTypeChange(tIdx, sIdx, e)}
                        className="input"
                        min="1"
                        required
                      />
                      {theater.seatTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSeatType(tIdx, sIdx)}
                          className="remove-seat-type-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSeatType(tIdx)}
                    className="add-seat-type-btn"
                  >
                    Add Seat Type
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add-seat-type-btn"
              onClick={addTheater}
              style={{ marginTop: 8 }}
            >
              Add Theater
            </button>
          </div>
          <section className="form-actions">
            <button type="submit">
              {editId ? "Update Cinema" : "Add Cinema"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    location: "",
                    theaters: [
                      {
                        theaterNo: "",
                        seatingRows: "",
                        seatingColumns: "",
                        seatTypes: [{ name: "", price: "", number: "" }],
                      },
                    ],
                  });
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </section>
        </form>
        <ul className="editcinemas-list">
          {cinemas.map((cinema) => (
            <li className="editcinemas-list-item" key={cinema.id}>
              <section className="cinema-info">
                <strong>{cinema.name}</strong>
                <p>{cinema.location}</p>
              </section>
              <section className="cinema-actions">
                <button
                  className="edit"
                  type="button"
                  onClick={() => handleEdit(cinema)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() => handleDelete(cinema.id)}
                >
                  Delete
                </button>
              </section>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default EditCinemasPage;
