import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import defaultVehicles from "../data/vehicles";

function Dashboard() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    availableVehicles: defaultVehicles.length,
    rentals: 0,
    payments: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    // Get vehicles from localStorage
    const savedVehicles =
      JSON.parse(localStorage.getItem("vehicles")) ||
      defaultVehicles;

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = bookings.filter(
      (booking) =>
        booking.userId === currentUser.id
    );

    const totalPayments = userBookings
      .filter(
        (booking) =>
          booking.paymentStatus === "Paid"
      )
      .reduce(
        (total, booking) =>
          total + booking.totalAmount,
        0
      );

    setStats({
      availableVehicles: savedVehicles.filter(
        (vehicle) => vehicle.available
      ).length,

      rentals: userBookings.length,

      payments: totalPayments,
    });
  }, [navigate]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-page">

      <Navbar />

      <section className="welcome-section">

        <div>
          <p className="small-text">
            Welcome back
          </p>

          <h1>
            Hello, {user.name}! 👋
          </h1>

          <p className="email-text">
            {user.email}
          </p>
        </div>

        <button
          className="browse-main-btn"
          onClick={() => navigate("/vehicles")}
        >
          🚗 Browse Vehicles
        </button>

      </section>


      <section className="stats-container">

        <div className="stat-card">

          <div className="stat-icon">
            🚗
          </div>

          <div>
            <p>Available Vehicles</p>

            <h2>
              {stats.availableVehicles}
            </h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <p>My Rentals</p>

            <h2>
              {stats.rentals}
            </h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            💳
          </div>

          <div>
            <p>Total Payments</p>

            <h2>
              ₹{stats.payments}
            </h2>
          </div>

        </div>

      </section>


      <section className="quick-section">

        <h2>Quick Actions</h2>

        <div className="action-container">

          <div
            className="action-card"
            onClick={() =>
              navigate("/vehicles")
            }
          >

            <span>🚗</span>

            <h3>Rent a Vehicle</h3>

            <p>
              Find and book your perfect vehicle.
            </p>

          </div>


          <div
            className="action-card"
            onClick={() =>
              navigate("/rentals")
            }
          >

            <span>📋</span>

            <h3>My Rentals</h3>

            <p>
              View your booking and payment history.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;