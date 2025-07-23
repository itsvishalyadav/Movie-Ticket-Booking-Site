import React, { useEffect, useState } from "react";

export default function CitySelector({ onSelect, selectedCityId, placeholder = "Search city...", style = {}, className = "" }) {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load cities");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(cities);
    } else {
      const s = search.toLowerCase();
      setFiltered(
        cities.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            (c.state_name && c.state_name.toLowerCase().includes(s))
        )
      );
    }
  }, [search, cities]);

  return (
    <div className={className} style={{ width: 300, ...style }}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 8 }}
      />
      {loading && <div>Loading cities...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{maxHeight: 250, overflowY: "auto", border: "1px solid #eee", borderRadius: 6, background: "#1E1E1E" }}>
        {filtered.length === 0 && !loading && <div style={{ padding: 8 }}>No cities found.</div>}
        {filtered.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelect && onSelect(city)}
            style={{
              padding: 8,
              cursor: "pointer",
              background: city.id === selectedCityId ? "#f5c518" : undefined,
              color: "#fff", 
              borderBottom: "1px solid #f3f3f3",
            }}
          >
            {city.name}
            {city.state_name ? `, ${city.state_name}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
} 