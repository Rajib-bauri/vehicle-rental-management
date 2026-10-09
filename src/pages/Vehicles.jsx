import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultVehicles from "../data/vehicles";
import Navbar from "../components/Navbar";

function Vehicles() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [vehicleList, setVehicleList] = useState(() => {
  const savedVehicles =
    JSON.parse(localStorage.getItem("vehicles"));

  return savedVehicles || defaultVehicles;
});

  const navigate = useNavigate();

  const filteredVehicles = vehicleList.filter((vehicle) => {
    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || vehicle.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="vehicles-page">

      <Navbar />

      <div className="vehicles-header">
        <div>
          <p className="small-text">
            Explore our collection
          </p>

          <h1>Find Your Perfect Ride 🚗</h1>

          <p className="vehicles-subtitle">
            Choose from our wide range of comfortable
            and reliable vehicles.
          </p>
        </div>
      </div>

      {/* Search and Filter */}

      <div className="vehicle-controls">

        <input
          type="text"
          placeholder="🔍 Search vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Vehicles</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Bike">Bike</option>
        </select>

      </div>

      {/* Vehicle Cards */}

      <div className="vehicles-grid">

        {filteredVehicles.length === 0 ? (
          <div className="no-results">
            <h2>No vehicles found 😔</h2>
            <p>Try another search.</p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div
              className="vehicle-card"
              key={vehicle.id}
            >

              <div className="vehicle-image-container">

                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                />

                <span className="available-badge">
                  ● Available
                </span>

              </div>

              <div className="vehicle-content">

                <div className="vehicle-title">

                  <div>
                    <h2>{vehicle.name}</h2>

                    <p>{vehicle.type}</p>
                  </div>

                  <span className="rating">
                    ⭐ {vehicle.rating}
                  </span>

                </div>

                <div className="vehicle-details">

                  <span>⛽ {vehicle.fuel}</span>

                  <span>👥 {vehicle.seats} Seats</span>

                  <span>⚙️ {vehicle.transmission}</span>

                </div>

                <div className="vehicle-footer">

                  <div>
                    <small>Starting from</small>

                    <h3>
                      ₹{vehicle.price}
                      <span>/day</span>
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/booking/${vehicle.id}`
                      )
                    }
                  >
                    Rent Now →
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Vehicles;