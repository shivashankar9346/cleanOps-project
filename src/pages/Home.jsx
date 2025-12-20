import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Waste Management & Desludging</h1>
        <p>Report and track desludging services with ease. Make your ward cleaner.</p>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="home-card">
          <h2>Raise Request</h2>
          <h4>Submit a desludging request in under a minute.</h4>
          <NavLink to="/submit" className="home-btn">Submit Now</NavLink>
        </div>

        <div className="home-card">
          <h2>My Requests</h2>
          <h4>Track the status of your submitted requests.</h4>
          <NavLink to="/requests" className="home-btn">View Requests</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home
