import axios from 'axios';
import React, { useState } from 'react';
// import './ContactUs.css';

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
    <div className="contact-container">
      <div className="contact-content" style={{transform:"translateY(30px)"}}>
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>

          <div className="contact-details">
            <div className="address-line">
              <img alt="location" src="image/marker.png" className="icon" />
              <div>
                <h3>Address</h3>
                <p>1002 West 5th Ave, Alaska, New York, 55060.</p>
              </div>
            </div>
            <div className="address-line">
              <img alt="phone" src="image/phone.png" className="icon" />
              <div>
                <h3>Phone</h3>
                <p>12523-4566-8954-8956</p>
              </div>
            </div>
            <div className="address-line">
              <img alt="email" src="image/mail.png" className="icon" />
              <div>
                <h3>Email</h3>
                <p>ecotrack2024@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Message</h2>
          <form onSubmit={handleEmail}>
            <div className="form-group6">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group6">
              <label htmlFor="message">Type your message...</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
