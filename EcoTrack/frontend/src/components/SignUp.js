import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
// import "./SignUp.css"; // Import the CSS file

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Individual");
  const [avatar, setAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const route = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("avatar", avatar);
    try {
      await axios.post("http://localhost:8000/api/v4/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Sign-up successful");
      setShowModal(true);
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("Sign-up failed");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    route("/login");
  };

  const verifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v4/users/verifyCode",
        { code },
        { withCredentials: true }
      );
      console.log("Verification response:", response.data);
      alert("Code verified successfully");
      setVerified(response.data.data);
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Code verification failed");
      setShowModal(true);
    }
  };

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v4/users/sendCode",
        { email },
        { withCredentials: true }
      );
      console.log("Code sent response:", response.data);
      alert("Verification code sent to your email");
    } catch (error) {
      console.error("Error sending code:", error);
      alert("Failed to send verification code");
      setShowModal(true);
    }
  };

  return (
    <div className="signup-page">
      {showModal && <Modal message={message} onClose={closeModal} />}
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendCode} className="code-button">
              Send Code
            </button>
          </div>
          <div className="input-group">
            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode} className="code-button">
              Verify Code
            </button>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Individual">Individual</option>
              <option value="Organisation">Organisation</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              required
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
