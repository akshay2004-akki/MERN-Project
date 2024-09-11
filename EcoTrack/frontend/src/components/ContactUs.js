import axios from 'axios';
import { Color } from 'highcharts';
import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(
        "http://localhost:8000/api/v4/contactUs",
        { name, email, message },
        { withCredentials: true }
      );
      alert("Your Message has been sent");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="contact-container" style={{
      display: 'flex',
      padding: '20px',
      minHeight: '100vh',
      backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
      `,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#121212'
    }}>
      {/* Contact Form Section */}
      <div className="contact-form" style={{
        width: '50%',
        padding: '20px',
        transform: "translateY(40px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)"
      }}>
        <h2 style={{ color: 'white', fontSize: '36px', marginBottom: '20px' }}>Ask Your Queries</h2>
        <form onSubmit={handleEmail}>
          <div className="form-group6" style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ color: 'white', fontSize: '18px', marginBottom: '8px', display: 'block' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#f0f0f0',
                fontSize: '16px'
              }}
            />
          </div>
          <div className="form-group6" style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ color: 'white', fontSize: '18px', marginBottom: '8px', display: 'block' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#f0f0f0',
                fontSize: '16px'
              }}
            />
          </div>
          <div className="form-group6" style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={{ color: 'white', fontSize: '18px', marginBottom: '8px', display: 'block' }}>Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#f0f0f0',
                fontSize: '16px'
              }}
            />
          </div>
          <button type="submit" className="send-btn" style={{
            width: '100%',
            padding: '12px',
            borderRadius: '25px',
            backgroundColor: '#6a5acd',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}>Submit</button>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="contact-info" style={{
        width: '50%',
        padding: '40px',
        color: 'white',
        // backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        marginLeft: "20px",
        // boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)"
      }}>
        <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>Contact <span style={{color:"aqua"}}>Us</span></h1>
        <p style={{ fontSize: '16px', marginBottom: '20px', lineHeight: '1.5' }}>
          For questions, technical assistance, or collaboration opportunities via the contact information provided.
        </p>

        <div className="contact-details" style={{ fontSize: '18px', lineHeight: '2' }}>
          <div className="contact-item">
            <i className='fa fa-phone' style={{ marginRight: '10px', verticalAlign: 'middle' }}></i>
            +91 82104 31308
          </div>
          <div className="contact-item">
            <i className='fa-solid fa-envelope' style={{ marginRight: '10px', verticalAlign: 'middle' }}></i>
            ecotrack2024@gmail.com
          </div>
          <div className="contact-item">
          <i class="fa-solid fa-location-dot" style={{ marginRight: '10px', verticalAlign: 'middle' }}></i>
            Sahibzada Ajit Singh Nagar, Mohali, 140307
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
