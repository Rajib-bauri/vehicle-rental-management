
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Rentals from "./pages/Rentals";
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {  }
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/vehicles" element={<Vehicles />} />

        <Route
  path="/booking/:id"
  element={<Booking />}
/>
           <Route
  path="/payment/:id"
  element={<Payment />}
/>

    <Route path="/rentals" element={<Rentals />} />

    <Route path="/admin" element={<Admin />} />

    <Route path="/admin" element={<Admin />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;