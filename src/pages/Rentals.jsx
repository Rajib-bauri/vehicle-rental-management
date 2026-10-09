import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Rentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = () => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = bookings.filter(
      (booking) =>
        booking.userId === currentUser?.id
    );

    setRentals(userBookings);
  };

  const handleCancelBooking = (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = bookings.map(
      (booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: "Cancelled",
              paymentStatus:
                booking.paymentStatus === "Paid"
                  ? "Paid"
                  : "Cancelled",
            }
          : booking
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    loadRentals();

    alert("Booking cancelled successfully!");
  };

  return (
    <div className="rentals-page">

      <Navbar />

      <main className="rentals-container">

        <div className="rentals-heading">

          <div>
            <p>DRIVERENT • YOUR GARAGE</p>

            <h1>My Rentals.</h1>

            <span>
              Your complete rental and payment history.
            </span>
          </div>

          <button
            className="browse-rentals-btn"
            onClick={() => navigate("/vehicles")}
          >
            + Rent a Vehicle
          </button>

        </div>


        {rentals.length === 0 ? (

          <section className="empty-rentals">

            <div className="empty-icon">
              🚗
            </div>

            <h2>
              Your garage is empty.
            </h2>

            <p>
              You haven't rented a vehicle yet.
              Find your perfect ride and start
              your journey.
            </p>

            <button
              onClick={() =>
                navigate("/vehicles")
              }
            >
              Browse Vehicles →
            </button>

          </section>

        ) : (

          <section className="rentals-list">

            {rentals.map((rental) => (

              <article
                className="rental-card"
                key={rental.id}
              >

                <div className="rental-main">

                  <div className="rental-icon">
                    🚗
                  </div>


                  <div className="rental-info">

                    <div className="rental-title-row">

                      <div>

                        <p>
                          VEHICLE RENTAL
                        </p>

                        <h2>
                          {rental.vehicleName}
                        </h2>

                      </div>


                      <span
                        className={
                          rental.status ===
                          "Confirmed"
                            ? "status confirmed"
                            : rental.status ===
                              "Cancelled"
                            ? "status cancelled"
                            : "status pending"
                        }
                      >
                        ● {rental.status}
                      </span>

                    </div>


                    <div className="rental-details">

                      <div>
                        <span>
                          Pickup
                        </span>

                        <strong>
                          {rental.startDate}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Return
                        </span>

                        <strong>
                          {rental.endDate}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Duration
                        </span>

                        <strong>
                          {rental.totalDays} day
                          {rental.totalDays > 1
                            ? "s"
                            : ""}
                        </strong>
                      </div>

                    </div>

                  </div>


                  <div className="rental-price">

                    <span>
                      Total amount
                    </span>

                    <h3>
                      ₹{rental.totalAmount}
                    </h3>

                    <small>
                      {rental.paymentMethod
                        ? `Paid via ${rental.paymentMethod}`
                        : "Payment pending"}
                    </small>

                  </div>

                </div>


                {rental.transactionId && (

                  <div className="transaction-row">

                    <span>
                      TRANSACTION ID
                    </span>

                    <strong>
                      {rental.transactionId}
                    </strong>

                  </div>

                )}


                {/* CANCEL BUTTON */}

                {rental.status !==
                  "Cancelled" && (

                  <div className="rental-actions">

                    <button
                      className="cancel-rental-btn"
                      onClick={() =>
                        handleCancelBooking(
                          rental.id
                        )
                      }
                    >
                      Cancel Booking
                    </button>

                  </div>

                )}

              </article>

            ))}

          </section>

        )}


        <button
          className="rentals-dashboard-btn"
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

export default Rentals;