import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <h2>CleanOps 🚛♻️</h2>
      </div>

      <div className='nav-links'>
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/community" className="nav-item">Community</NavLink>
      </div>

      <div className='auth-links'>
        <NavLink to="/login" className="nav-item login-btn">Login</NavLink>
        <NavLink to="/register" className="nav-item register-btn">Register</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
