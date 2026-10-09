import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert(`Welcome ${user.name}!`);

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-visual">

        <div className="auth-brand">
          🚗 DriveRent
        </div>

        <div className="auth-visual-content">
          <p>YOUR JOURNEY STARTS HERE</p>

          <h1>
            Drive beyond
            <br />
            ordinary.
          </h1>

          <span>
            Premium vehicles. Flexible rentals.
            <br />
            One simple experience.
          </span>
        </div>

        <div className="auth-quote">
          “Choose the road.
          <br />
          We'll handle the ride.”
        </div>

      </div>

      <div className="auth-form-section">

        <div className="auth-form">

          <div className="mobile-brand">
            🚗 DriveRent
          </div>

          <p className="auth-label">
            WELCOME BACK
          </p>

          <h2>Sign in.</h2>

          <p className="auth-subtitle">
            Access your rentals and continue
            your journey.
          </p>

          <form onSubmit={handleLogin}>

            <div className="auth-field">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <button
              className="auth-submit"
              type="submit"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>NEW TO DRIVERENT?</span>
          </div>

          <button
            className="auth-secondary"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>

          <p className="auth-footer">
            Vehicle Rental Management System
            <br />
            Demo Application • 2026
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;