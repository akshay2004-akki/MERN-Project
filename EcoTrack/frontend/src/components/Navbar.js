import React, { useState, useEffect } from "react";
import logo from '../Images/logo.jpg'
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({loggesIn, avatar}) => {
    const [bgColor, setBgColor] = useState("transparent")
    // const [display, setDisplay] = useState("block")
    const route = useNavigate()
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
      const handleNav = ()=>{
        route("/login")
      }
      const handleSignUp = ()=>{
        route("/signup")
      }
      const handleProfile = ()=>{
        route("/profile")
      }
  return (
    <nav className="navbar fixed-top" style={{backgroundColor: `${bgColor}`, zIndex:"3000"}}>
      <div className="logo">
        <img src={logo} alt="Environment" />
        <span>EcoTrack</span> 
      </div>
      <ul className="nav-links">
        <li ><Link to="/" style={{color:"green"}}>Home</Link></li>
        <li ><Link to="/about" style={{color:"green"}}>About</Link></li>
        <li className={`d-${!loggesIn ? "none" : "block"}`}><Link to="/tasks" style={{color:"green"}}>Tasks</Link></li>
        <li className={`d-${!loggesIn ? "none" : "block"}`}><Link to="/blog" style={{color:"green"}}>Blog</Link></li>
        <li><Link to="/contactUs" style={{color:"green"}}>Contact Us</Link></li>
        <li className={`d-${!loggesIn ? "none" : "block"}`}><Link to="/webinar" style={{color:"green"}}>Webinar</Link></li>
      </ul>
      <div className={`d-flex`} style={{gap:"30px"}}>
      <button className={`btn btn-success d-${loggesIn ? "none" : "block"}`} onClick={handleNav}>Log in</button>
      <button className={`btn btn-danger d-${loggesIn ? "none" : "block"}`} onClick={handleSignUp}>Sign Up</button>
      </div>
      <button className={`profile btn d-${loggesIn ? "block":"none"}`} style={{height:"50px", width:"50px", borderRadius:"50%", backgroundImage:`url(${avatar})`, backgroundSize:"cover"}} onClick={handleProfile}></button>
    </nav>
  );
};

export default Navbar;