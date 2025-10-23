import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");
    setIsLoggedIn(false);
    setEmail("");
    window.location.reload();
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => { 
    const storedemail = sessionStorage.getItem("email");
    if (storedemail) {
      setIsLoggedIn(true);
      setUsername(storedemail);
    }
  }, []);

  const displayName = username ? username.split('@')[0] : '';

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/instant-consultation">Instant Consultation</Link></li>
        <li className="link"><Link to="/booking-consultation">Booking Consultation</Link></li>
        <li className="link"><Link to="/review-form">Reviews</Link></li>

        {isLoggedIn ? (
          <>
            <li className="link welcome-message" onClick={handleDropdown} style={{cursor: "pointer", position: "relative"}}>
              Welcome, <strong>{displayName}</strong>
              
              {/* Dropdown menu */}
              {showDropdown && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    My Profile
                  </Link>
                  <Link to="/report" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    My Reports
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup"><button className="btn1">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/login"><button className="btn1">Login</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;