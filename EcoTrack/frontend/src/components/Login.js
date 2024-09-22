import React, { useState } from "react";
import logo from "../Images/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from './Modal'; // Import the Modal component

const Login = ({ setIsLoggedIn, setAvatar }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const route = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/users/login`, loginData, { withCredentials: true })
      .then((response) => {
        // Handle success
        setIsLoggedIn(true);
        setAvatar(response.data.data.avatar);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('avatar', response.data.data.avatar);
        
        setShowModal(true); // Show modal on success

      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        console.log(error.response.data);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    if (!localStorage.getItem('surveyCompleted')) {
      route('/survey');
    } else {
      route('/');
    }
  };

  return (
    <div className="login-container">
      {showModal && <Modal message="Login Successful!" onClose={closeModal} />} {/* Display modal */}
      <div className="sun"></div>
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
