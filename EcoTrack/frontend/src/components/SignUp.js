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
  const [avatarPreview, setAvatarPreview] = useState(null); // State to store image preview
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
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/users/register`, formData, {
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); // Create object URL for preview
    }
  };

  return (
    <div className="signup-page">
      {showModal && <Modal message={message} onClose={closeModal} />}
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label style={{color:"#fff"}} htmlFor="fullName">Full Name</label>
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
            <label style={{color:"#fff"}} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label style={{color:"#fff"}} htmlFor="password">Password</label>
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
            <label style={{color:"#fff"}} htmlFor="role">Role</label>
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
            <label style={{color:"#fff"}} htmlFor="avatar">Avatar</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              required
              onChange={handleAvatarChange}
            />
          </div>
          {avatarPreview && (
            <div className="avatar-preview">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </div>
          )}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
