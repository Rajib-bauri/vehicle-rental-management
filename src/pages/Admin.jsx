import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import defaultVehicles from "../data/vehicles";

function Admin() {
  const [bookings, setBookings] = useState([]);

  const [vehicleList, setVehicleList] = useState(() => {
    const savedVehicles =
      JSON.parse(localStorage.getItem("vehicles"));

    return savedVehicles || defaultVehicles;
  });

  const [showForm, setShowForm] = useState(false);

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "SUV",
    price: "",
    fuel: "Petrol",
    seats: "",
    transmission: "Manual",
    image: "",
  });

  const currentUser =
  JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "admin") {
  navigate("/dashboard");
  return null;
}

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(savedBookings);

    localStorage.setItem(
      "vehicles",
      JSON.stringify(vehicleList)
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewVehicle({
      ...newVehicle,
      [name]: value,
    });
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();

    if (
      !newVehicle.name ||
      !newVehicle.price ||
      !newVehicle.seats ||
      !newVehicle.image
    ) {
      alert("Please fill all vehicle details!");
      return;
    }

    const vehicle = {
      id: Date.now(),
      name: newVehicle.name,
      type: newVehicle.type,
      price: Number(newVehicle.price),
      fuel: newVehicle.fuel,
      seats: Number(newVehicle.seats),
      transmission: newVehicle.transmission,
      rating: 4.5,
      available: true,
      image: newVehicle.image,
    };

    const updatedVehicles = [
      ...vehicleList,
      vehicle,
    ];

    setVehicleList(updatedVehicles);

    localStorage.setItem(
      "vehicles",
      JSON.stringify(updatedVehicles)
    );

    setNewVehicle({
      name: "",
      type: "SUV",
      price: "",
      fuel: "Petrol",
      seats: "",
      transmission: "Manual",
      image: "",
    });

    setShowForm(false);

    alert("Vehicle added successfully!");
  };

  const handleDeleteVehicle = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedVehicles = vehicleList.filter(
      (vehicle) => vehicle.id !== id
    );

    setVehicleList(updatedVehicles);

    localStorage.setItem(
      "vehicles",
      JSON.stringify(updatedVehicles)
    );

    alert("Vehicle deleted successfully!");
  };

  return (
    <div className="admin-page">

      <Navbar />

      <main className="admin-container">

        {/* HEADER */}

        <div className="admin-heading">
          <div>
            <p>DRIVERENT • MANAGEMENT</p>

            <h1>Admin Panel.</h1>

            <span>
              Manage vehicles, rentals and payments.
            </span>
          </div>
        </div>


        {/* STATS */}

        <section className="admin-stats">

          <div className="admin-stat-card">
            <span>🚗</span>

            <div>
              <p>Total Vehicles</p>
              <h2>{vehicleList.length}</h2>
            </div>
          </div>


          <div className="admin-stat-card">
            <span>📋</span>

            <div>
              <p>Total Rentals</p>
              <h2>{bookings.length}</h2>
            </div>
          </div>


          <div className="admin-stat-card">
            <span>💳</span>

            <div>
              <p>Paid Rentals</p>

              <h2>
                {
                  bookings.filter(
                    (booking) =>
                      booking.paymentStatus ===
                      "Paid"
                  ).length
                }
              </h2>
            </div>
          </div>

        </section>


        {/* VEHICLE MANAGEMENT */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <p>VEHICLE MANAGEMENT</p>

              <h2>Vehicles</h2>
            </div>

            <button
              className="admin-add-btn"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              {showForm
                ? "✕ Close"
                : "+ Add Vehicle"}
            </button>

          </div>


          {/* ADD VEHICLE FORM */}

          {showForm && (
            <form
              className="admin-vehicle-form"
              onSubmit={handleAddVehicle}
            >

              <div className="admin-form-grid">

                <div className="admin-form-field">
                  <label>Vehicle Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. BMW X5"
                    value={newVehicle.name}
                    onChange={handleInputChange}
                  />
                </div>


                <div className="admin-form-field">
                  <label>Vehicle Type</label>

                  <select
                    name="type"
                    value={newVehicle.type}
                    onChange={handleInputChange}
                  >
                    <option value="SUV">
                      SUV
                    </option>

                    <option value="Sedan">
                      Sedan
                    </option>

                    <option value="Hatchback">
                      Hatchback
                    </option>

                    <option value="Bike">
                      Bike
                    </option>

                    <option value="Luxury">
                      Luxury
                    </option>
                  </select>
                </div>


                <div className="admin-form-field">
                  <label>Price / Day</label>

                  <input
                    type="number"
                    name="price"
                    placeholder="2500"
                    value={newVehicle.price}
                    onChange={handleInputChange}
                  />
                </div>


                <div className="admin-form-field">
                  <label>Fuel</label>

                  <select
                    name="fuel"
                    value={newVehicle.fuel}
                    onChange={handleInputChange}
                  >
                    <option value="Petrol">
                      Petrol
                    </option>

                    <option value="Diesel">
                      Diesel
                    </option>

                    <option value="Electric">
                      Electric
                    </option>

                    <option value="CNG">
                      CNG
                    </option>
                  </select>
                </div>


                <div className="admin-form-field">
                  <label>Seats</label>

                  <input
                    type="number"
                    name="seats"
                    placeholder="5"
                    value={newVehicle.seats}
                    onChange={handleInputChange}
                  />
                </div>


                <div className="admin-form-field">
                  <label>Transmission</label>

                  <select
                    name="transmission"
                    value={
                      newVehicle.transmission
                    }
                    onChange={handleInputChange}
                  >
                    <option value="Manual">
                      Manual
                    </option>

                    <option value="Automatic">
                      Automatic
                    </option>
                  </select>
                </div>

              </div>


              <div className="admin-form-field full-width">
                <label>Vehicle Image URL</label>

                <input
                  type="text"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={newVehicle.image}
                  onChange={handleInputChange}
                />
              </div>


              <button
                type="submit"
                className="admin-save-btn"
              >
                Add Vehicle →
              </button>

            </form>
          )}


          {/* VEHICLE LIST */}

          <div className="admin-vehicle-list">

            {vehicleList.map((vehicle) => (

              <div
                className="admin-vehicle-card"
                key={vehicle.id}
              >

                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                />


                <div className="admin-vehicle-info">

                  <h3>{vehicle.name}</h3>

                  <p>
                    {vehicle.type} •{" "}
                    {vehicle.fuel} •{" "}
                    {vehicle.transmission}
                  </p>

                  <strong>
                    ₹{vehicle.price}
                    <span>/day</span>
                  </strong>

                </div>


                <button
                  className="admin-delete-btn"
                  onClick={() =>
                    handleDeleteVehicle(
                      vehicle.id
                    )
                  }
                >
                  🗑 Delete
                </button>

              </div>

            ))}

          </div>

        </section>


        {/* RENTAL BOOKINGS */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <p>RECENT ACTIVITY</p>

              <h2>Rental Bookings</h2>
            </div>

          </div>


          {bookings.length === 0 ? (

            <div className="admin-empty">

              <div>📋</div>

              <h3>No bookings yet</h3>

              <p>
                Rental bookings will appear here
                once customers make a reservation.
              </p>

            </div>

          ) : (

            <div className="admin-bookings">

              {bookings.map((booking) => (

                <div
                  className="admin-booking-card"
                  key={booking.id}
                >

                  <div className="admin-booking-icon">
                    🚗
                  </div>


                  <div className="admin-booking-info">

                    <h3>
                      {booking.vehicleName}
                    </h3>

                    <p>
                      {booking.startDate} →{" "}
                      {booking.endDate}
                    </p>

                    <small>
                      {booking.totalDays} day
                      {booking.totalDays > 1
                        ? "s"
                        : ""}
                    </small>

                  </div>


                  <div className="admin-booking-payment">

                    <strong>
                      ₹{booking.totalAmount}
                    </strong>

                    <span
                      className={
                        booking.paymentStatus ===
                        "Paid"
                          ? "admin-paid"
                          : "admin-pending"
                      }
                    >
                      {booking.paymentStatus ||
                        "Pending"}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* BACK BUTTON */}

        <button
          className="admin-dashboard-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </main>

    </div>
  );
}

export default Admin;