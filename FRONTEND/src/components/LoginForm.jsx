import React, { useEffect, useState } from "react";
import { login } from "../api/user.auth.api";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import "./AuthForms.css";
import { useAuth } from "../AuthContext.jsx"; // 👈 NEW
import { axiosInstance } from "../helper/axiosInstance.js";

const LoginForm = ({ state }) => {
  // props destructuring to access state function passed from parent component.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { setUserRole } = useAuth();
  const navigate = useNavigate(); // import useNavigate from "@tanstack/react-rout

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        const user = res.data?.user;
        if (user?.role === "ngo") {
          navigate({ to: "/dashboard/ngo" });
        } else {
          navigate({ to: "/dashboard/donor" });
        }
      } catch (error) {

      }
    };
    checkLogin()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      setUserRole(data.data.user.user.role);
      if (data.data.user.user.role == "donor") {
        navigate({ to: "/dashboard/donor" });
      } else {
        navigate({ to: "/dashboard/ngo" });
      }

      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form login-form">
        <h2>Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-redirect">
            <p>
              Don't have an account?
              <span onClick={() => state(false)} className="auth-link">
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
