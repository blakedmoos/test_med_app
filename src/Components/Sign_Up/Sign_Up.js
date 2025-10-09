import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  // State variables for form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState(''); // Error message state

  const navigate = useNavigate(); // Navigation hook

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !phone || !password) {
      setShowerr('Please fill out all fields.');
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setShowerr('Phone number must be exactly 10 digits.');
      return;
    }

    try {
      // API call to register user
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const json = await response.json();

      if (json.authtoken) {
        // Save user data in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);

        alert('Account created successfully!');
        navigate('/'); // Redirect to home page
        window.location.reload(); // Reload to update navbar
      } else {
        if (json.errors && json.errors.length > 0) {
          setShowerr(json.errors[0].msg);
        } else {
          setShowerr(json.error || 'Something went wrong. Try again.');
        }
      }
    } catch (err) {
      setShowerr('Server error. Please try again later.');
    }
  };

  // Render the Sign Up form
  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?{' '}
          <span>
            <Link to="/login" style={{ color: '#2190FF' }}>
              Login
            </Link>
          </span>
        </div>

        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your 10-digit phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {showerr && (
              <div className="err" style={{ color: 'red', marginBottom: '10px' }}>
                {showerr}
              </div>
            )}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => setShowerr('')}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;