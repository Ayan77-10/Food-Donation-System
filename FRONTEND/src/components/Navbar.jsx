import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./Navbar.css";
import { logoutUser } from "../api/user.auth.api";
import { useAuth } from "../AuthContext.jsx"; // 👈 NEW

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userRole, loading } = useAuth(); // 👈 NEW global state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) return null; // 👈 Don't show navbar until role is loaded

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Food-Donation</span>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            to={userRole === "ngo" ? "/dashboard/ngo" : "/dashboard/donor"}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/About"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            to="/auth"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Login/Register
          </Link>

          {userRole === "donor" && (
            <Link
              to="/request"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Request
            </Link>
          )}

          {userRole && (
            <Link
              to="/"
              className="nav-link"
              onClick={logoutUser}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
