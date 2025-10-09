import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${isActive ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <ul className={`nav__links ${isActive ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/signup">
            <button className="btn1">Sign Up</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/login">
            <button className="btn1">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;