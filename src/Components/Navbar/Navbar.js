import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav>
      <div className="nav__logo">
        <a href="/">StayHealthy</a>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${isActive ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <ul className={`nav__links ${isActive ? "active" : ""}`}>
        <li className="link">
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        <li className="link">
          <a href="../Sign_Up/Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;