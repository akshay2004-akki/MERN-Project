import React from "react";
import logo from '../Images/logo.jpg'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar fixed-top">
      <div className="logo">
        <img src={logo} alt="Environment" />
        <span>EcoTrack</span> 
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/whatWeDo">What We Do</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contactUs">Contact Us</Link></li>
        <li><Link to="/webinar">Webinar</Link></li>
      </ul>
      <button className="donate-button">Make A Donation</button>
    </nav>
  );
};

export default Navbar;