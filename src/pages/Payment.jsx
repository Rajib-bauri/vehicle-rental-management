import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState("UPI");

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const booking = bookings.find(
    (b) => b.id === Number(id)
  );

  if (!booking) {
    return <h2>Booking not found!</h2>;
  }

  const handlePayment = () => {
    const transactionId =
      "DR" + Date.now();

    const updatedBookings = bookings.map((b) =>
      b.id === booking.id
        ? {
            ...b,
            paymentMethod: method,
            transactionId: transactionId,
            paymentStatus: "Paid",
            status: "Confirmed",
          }
        : b
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    alert(
      `Payment Successful!\nTransaction ID: ${transactionId}`
    );

    navigate("/rentals");
  };

  return (
    <div className="payment-page">

      <div className="payment-container">

        {/* Header */}

        <div className="payment-heading">
          <p>DRIVERENT • SECURE CHECKOUT</p>

          <h1>Complete your journey.</h1>

          <span>
            One final step before you hit the road.
          </span>
        </div>


        {/* Payment Layout */}

        <div className="payment-layout">

          {/* LEFT — RECEIPT */}

          <section className="payment-receipt">

            <div className="receipt-top">
              <div>
                <span>RENTAL RECEIPT</span>
                <h2>DriveRent</h2>
              </div>

              <strong>DR-2026</strong>
            </div>


            <div className="receipt-line"></div>


            <div className="receipt-vehicle">

              <div className="payment-car-image">
                <span>🚗</span>
              </div>

              <div>
                <small>VEHICLE</small>

                <h3>{booking.vehicleName}</h3>

                <p>
                  {booking.totalDays} rental day
                  {booking.totalDays > 1 ? "s" : ""}
                </p>
              </div>

            </div>


            <div className="receipt-details">

              <div>
                <span>Pickup</span>
                <strong>{booking.startDate}</strong>
              </div>

              <div>
                <span>Return</span>
                <strong>{booking.endDate}</strong>
              </div>

              <div>
                <span>Rental days</span>
                <strong>{booking.totalDays}</strong>
              </div>

              <div>
                <span>Rate / day</span>
                <strong>₹{booking.totalAmount / booking.totalDays}</strong>
              </div>

            </div>


            <div className="receipt-line"></div>


            <div className="receipt-total">

              <span>TOTAL TO PAY</span>

              <strong>
                ₹{booking.totalAmount}
              </strong>

            </div>


            <div className="demo-note">
              <span>ⓘ</span>

              <p>
                This is a demo payment for the
                Vehicle Rental Management System.
              </p>
            </div>

          </section>


          {/* RIGHT — PAYMENT */}

          <section className="payment-card">

            <div className="payment-card-header">

              <p>02 — PAYMENT</p>

              <h2>Choose payment method</h2>

            </div>


            <div className="payment-methods">

              <button
                className={
                  method === "UPI"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setMethod("UPI")}
              >
                <span className="method-icon">
                  UPI
                </span>

                <div>
                  <strong>UPI Payment</strong>
                  <small>Google Pay / PhonePe / Paytm</small>
                </div>

                <span className="method-check">
                  {method === "UPI" ? "✓" : ""}
                </span>
              </button>


              <button
                className={
                  method === "Card"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setMethod("Card")}
              >
                <span className="method-icon">
                  💳
                </span>

                <div>
                  <strong>Credit / Debit Card</strong>
                  <small>Visa / Mastercard / RuPay</small>
                </div>

                <span className="method-check">
                  {method === "Card" ? "✓" : ""}
                </span>
              </button>


              <button
                className={
                  method === "Cash"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setMethod("Cash")}
              >
                <span className="method-icon">
                  💵
                </span>

                <div>
                  <strong>Cash on Pickup</strong>
                  <small>Pay when you collect the vehicle</small>
                </div>

                <span className="method-check">
                  {method === "Cash" ? "✓" : ""}
                </span>
              </button>

            </div>


            <div className="payment-security">

              <span>🔒</span>

              <div>
                <strong>Secure checkout</strong>

                <p>
                  Your booking information is
                  securely stored for this demo.
                </p>
              </div>

            </div>


            <button
              className="pay-now-btn"
              onClick={handlePayment}
            >
              Pay ₹{booking.totalAmount}
              <span>→</span>
            </button>


            <button
              className="back-payment-btn"
              onClick={() =>
                navigate(`/booking/${booking.vehicleId}`)
              }
            >
              ← Back to booking
            </button>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Payment;