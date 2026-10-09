import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("User already exists!");
      return;
    }

    const newUser = {
  id: Date.now(),
  name,
  email,
  password,
  role:
    email.toLowerCase() === "admin@driverent.com"
      ? "admin"
      : "user",
};

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="auth-page">

      <div className="auth-visual">

        <div className="auth-brand">
          🚗 DriveRent
        </div>

        <div className="auth-visual-content">
          <p>BUILT FOR THE OPEN ROAD</p>

          <h1>
            Your ride.
            <br />
            Your story.
          </h1>

          <span>
            Discover premium vehicles and
            <br />
            make every journey memorable.
          </span>
        </div>

        <div className="auth-quote">
          “Life is a journey.
          <br />
          Make yours worth driving.”
        </div>

      </div>

      <div className="auth-form-section">

        <div className="auth-form">

          <div className="mobile-brand">
            🚗 DriveRent
          </div>

          <p className="auth-label">
            START YOUR JOURNEY
          </p>

          <h2>Join us.</h2>

          <p className="auth-subtitle">
            Create your account and discover
            your next perfect ride.
          </p>

          <form onSubmit={handleSignup}>

            <div className="auth-field">
              <label>Full name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

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
              <label>Create password</label>

              <input
                type="password"
                placeholder="Create a password"
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
              Create Account
              <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>ALREADY A MEMBER?</span>
          </div>

          <button
            className="auth-secondary"
            onClick={() => navigate("/login")}
          >
            Sign in instead
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

export default Signup;