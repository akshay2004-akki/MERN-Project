import React, { useState } from "react";
import logo from "../Images/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setAvatar }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const route = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    axios.post("http://localhost:8000/api/v4/users/login", loginData, { withCredentials: true })
      .then((response) => {
        // Handle success
        console.log(response.data);
        alert(response.data.message);

        // Update state
        setIsLoggedIn(true);
        setAvatar(response.data.data.avatar);

        // Store login status and avatar in localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('avatar', response.data.data.avatar);

        route("/");
      })
      .catch((error) => {
        // Handle error
        console.error("There was an error logging in!", error);
        console.log(error.response.data);
      });
  };

  return (
    <div className="login-container">
      <div className="sun"></div>
      <svg className="fog-svg">
        <filter id="fog">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="10"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <div className="login-form">
        <div className="login-header">
          <h1 style={{fontFamily:"Poppins"}}>Green Login Form</h1>
          <div className="logo">
            <img src={logo} alt="Globe Logo" />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="options">
            <div className="show-password">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>
            <a href="/" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Keep Me Signed In</label>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
