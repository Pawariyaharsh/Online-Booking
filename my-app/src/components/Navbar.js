

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="/Booking.com-Logo.png" alt="Logo" className="logo-image" />
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        {user ? (
          <>
            <span className="nav-link" style={{ color: "red" }}>Hello User {user.fullName}</span>
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">User Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/admin-login" className="nav-link">Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
