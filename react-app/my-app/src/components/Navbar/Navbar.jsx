import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>CarRental</h2>

      <ul className="nav-links">
        {/* Home */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Browse Cars */}
        <li>
          <Link to="/cars">Cars</Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            {/* Dashboard only for Admin */}
            {user?.role === "admin" && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}

            {/* Profile only for normal users */}
            {user?.role !== "admin" && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;