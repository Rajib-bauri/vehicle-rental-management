import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("currentUser"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav>
      <h2>🚗 DriveRent</h2>

      <div>
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/vehicles")}>
          Vehicles
        </button>

        {user?.role === "admin" && (
  <button onClick={() => navigate("/admin")}>
    Admin
  </button>
)}

        <button onClick={() => navigate("/rentals")}>
          My Rentals
        </button>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <span>
          👤 {user?.name}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;