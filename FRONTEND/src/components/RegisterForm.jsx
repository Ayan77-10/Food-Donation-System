import React, { useState } from "react";
import { register } from "../api/user.auth.api";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import "./AuthForms.css";

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // for location
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const navigate = useNavigate(); // import useNavigate from "@tanstack/react-router";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await register(name, email, password);
      navigate("/login"); // navigate to the login page after successful registration.

      setSuccess(true);

      // clear form 
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = (e) => {
    e.preventDefault();
    setLocationStatus("Fetching your location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus("Location successfully captured");
        },
        (err) => {
          setLocationStatus("Location access denied or unavailable");
        }
      );
    } else {
      setLocationStatus("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form register-form">
        <h2>Create an Account</h2>

        {/* {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Your account has been created successfully.</p>
            <Link to="/login" className="auth-button">
              Login Now
            </Link>
          </div>
        ) : (
          
        // )}  */}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength="8"
              />
            </div>

            <div className="form-group location-group">
              <label htmlFor="location">Location</label>
              <div className="location-container">
                <button
                  onClick={handleLocation}
                  className="location-button"
                  type="button"
                >
                  Get My Location
                </button>
                {location.lat && (
                  <div className="location-status success">
                    <span>✓</span> Location captured
                  </div>
                )}
                {locationStatus && !location.lat && (
                  <div className="location-status">{locationStatus}</div>
                )}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>

            <div className="auth-redirect">
              <p>
                Already have an account?
                <span onClick={() => state(true)}>Log in</span>
              </p>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default RegisterForm;
