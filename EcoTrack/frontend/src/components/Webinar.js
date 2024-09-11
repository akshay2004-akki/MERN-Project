import React, { useState } from "react";
import axios from "axios";
// import './Webinar.css'; // Import CSS for styling

function Webinar() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v4/webinar/register",
        formData
      );
      setMessage(response.data.message || "Webinar registered successfully!");
      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        date: "",
      });
    } catch (error) {
      setMessage("Error: " + error.response.data || error.message);
    }
  };

  return (
    <div
      className="webinar-registration-container"
      style={{
        transform: "tranlateY(90px)",
        height: "90vh",
        fontFamily: "Ubuntu",
        backgroundImage: `
        radial-gradient(circle at top right, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
      `,
      backgroundColor: '#242222'
      }}
    >
      {/* Left Section */}
      <div className="webinar-left-section">
        <div className="branding">
          {/* <img className="webinar-logo" src="logo.png" alt="Webinar Logo" /> */}
          {/* <h1>Webinar Title</h1>
          <p>A powerful, yet easy-to-use application for managing webinars and registrations.</p> */}
        </div>
        {/* <div className="version">Version 2.1</div> */}
      </div>

      {/* Right Section - Form */}
      <div className="webinar-right-section">
        <div className="form-container">
          <h2>Register for <span style={{color:"aqua"}}>Webinar</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="date">Preferred Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button" style={{backgroundColor:"aqua", color:"#121212"}}>
              Submit
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Webinar;
