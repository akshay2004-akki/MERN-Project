import React, { useState, useEffect } from "react";
import logo from '../Images/logo.jpg'
import { Link } from "react-router-dom";
const Navbar = () => {
    const [bgColor, setBgColor] = useState("transparent")
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setBgColor("black");
          } else {
            setBgColor("transparent");
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <nav className="navbar fixed-top" style={{backgroundColor: `${bgColor}`}}>
      <div className="logo">
        <img src={logo} alt="Environment" />
        <span>EcoTrack</span> 
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contactUs">Contact Us</Link></li>
        <li><Link to="/webinar">Webinar</Link></li>
      </ul>
      <div className="d-flex" style={{gap:"30px"}}>
      <button className="btn btn-success">Log in</button>
      <button className="btn btn-danger">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;