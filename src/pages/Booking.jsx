import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultVehicles from "../data/vehicles";
import Navbar from "../components/Navbar";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get vehicles from localStorage first
  const savedVehicles =
    JSON.parse(localStorage.getItem("vehicles")) ||
    defaultVehicles;

  const vehicle = savedVehicles.find(
    (v) => v.id === Number(id)
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!vehicle) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Vehicle not found!</h2>

          <button
            onClick={() => navigate("/vehicles")}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            ← Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  let totalDays = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      (end - start) /
      (1000 * 60 * 60 * 24);

    totalDays =
      difference > 0 ? difference : 0;
  }

  const totalAmount =
    totalDays * vehicle.price;

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert(
        "Please select pickup and return dates!"
      );
      return;
    }

    if (totalDays <= 0) {
      alert(
        "Return date must be after pickup date!"
      );
      return;
    }

    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );

    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const bookings =
      JSON.parse(
        localStorage.getItem("bookings")
      ) || [];

    // Double booking check
    const hasConflict = bookings.some(
      (booking) => {
        if (
          booking.vehicleId !== vehicle.id
        ) {
          return false;
        }

        // Cancelled bookings don't block dates
        if (
          booking.status === "Cancelled" ||
          booking.paymentStatus === "Refunded"
        ) {
          return false;
        }

        return (
          startDate < booking.endDate &&
          endDate > booking.startDate
        );
      }
    );

    if (hasConflict) {
      alert(
        "This vehicle is already booked for the selected dates!"
      );
      return;
    }

    const booking = {
      id: Date.now(),
      userId: currentUser.id,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startDate,
      endDate,
      totalDays,
      totalAmount,
      status: "Pending Payment",
      paymentStatus: "Pending",
    };

    bookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
    );

    navigate(
      `/payment/${booking.id}`
    );
  };

  return (
    <div className="booking-page">

      <Navbar />

      <main className="booking-container">

        <div className="booking-heading">

          <p>
            DRIVERENT • RESERVATION
          </p>

          <h1>
            Make it yours.
          </h1>

          <span>
            Choose your dates and get ready
            to drive.
          </span>

        </div>


        <div className="booking-layout">

          <section className="booking-vehicle">

            <div className="booking-image">

              <img
                src={vehicle.image}
                alt={vehicle.name}
              />

              <span>
                ● AVAILABLE
              </span>

            </div>


            <div className="booking-vehicle-info">

              <div>

                <p className="vehicle-category">
                  {vehicle.type} • PREMIUM RENTAL
                </p>

                <h2>
                  {vehicle.name}
                </h2>

              </div>

              <div className="booking-rating">
                ⭐ {vehicle.rating}
              </div>

            </div>


            <div className="booking-specs">

              <div>
                <strong>⛽</strong>
                <span>Fuel</span>
                <b>{vehicle.fuel}</b>
              </div>

              <div>
                <strong>👥</strong>
                <span>Seats</span>
                <b>{vehicle.seats}</b>
              </div>

              <div>
                <strong>⚙</strong>
                <span>Gearbox</span>
                <b>{vehicle.transmission}</b>
              </div>

            </div>


            <div className="daily-price">

              <small>
                DAILY RATE
              </small>

              <h3>
                ₹{vehicle.price}
                <span>/ day</span>
              </h3>

            </div>

          </section>


          <section className="booking-form-card">

            <div className="form-top">

              <div>

                <p>
                  01 — YOUR TRIP
                </p>

                <h2>
                  Rental details
                </h2>

              </div>

              <span>
                DR-2026
              </span>

            </div>


            <div className="date-fields">

              <div className="date-field">

                <label>
                  PICKUP DATE
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="date-field">

                <label>
                  RETURN DATE
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="booking-summary">

              <p>
                BOOKING SUMMARY
              </p>

              <div>
                <span>
                  Rental days
                </span>

                <strong>
                  {totalDays}
                </strong>
              </div>


              <div>
                <span>
                  Daily rate
                </span>

                <strong>
                  ₹{vehicle.price}
                </strong>
              </div>


              <div className="summary-total">

                <span>
                  TOTAL
                </span>

                <strong>
                  ₹{totalAmount}
                </strong>

              </div>

            </div>


            <button
              className="continue-payment-btn"
              onClick={handleBooking}
            >
              Continue to Payment
              <span>→</span>
            </button>


            <button
              className="back-vehicles-btn"
              onClick={() =>
                navigate("/vehicles")
              }
            >
              ← Back to vehicles
            </button>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Booking;