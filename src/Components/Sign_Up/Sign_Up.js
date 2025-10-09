import React, { useState } from "react";
import "./Sign_Up.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(""); // clear previous message

    // Check all fields are filled
    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      alert("Please fill out all fields.");
      return;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Simulate account creation success
    console.log("Form submitted:", formData);
    setSuccessMessage("Account created successfully!");

    // Clear fields after successful submission
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?{" "}
          <span>
            <Link to="/login" style={{ color: "#2190FF" }}>Login</Link>
          </span>
        </div>

        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

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
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => setFormData({ name: "", phone: "", email: "", password: "" })}
              >
                Reset
              </button>
            </div>
          </form>

          {/* ✅ Success message appears here */}
          {successMessage && (
            <p style={{ color: "green", marginTop: "15px", fontWeight: "bold" }}>
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
