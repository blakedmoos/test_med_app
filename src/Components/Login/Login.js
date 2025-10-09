import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill out both email and password.");
      return;
    }

    console.log("Login submitted:", formData);
    // Handle login logic (API call)
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member? <span>
            <Link to="/signup" style={{ color: "#2190FF" }}>Sign Up Here</Link>
            </span>

        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button type="reset" className="btn btn-danger">
                Reset
              </button>
            </div>

            <div className="login-text" style={{ marginTop: "10px" }}>
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;