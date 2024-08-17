import axios from 'axios';
import React, { useState } from 'react';
// import './ContactUs.css';



function ContactUs() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleEmail = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(
        "http://localhost:8000/api/v4/contactUs",
        {
          name: name,
          email: email,
          message: message
        },
        { withCredentials: true }
      );
      alert("Your Message has been sent");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  return (
    <div className="contact-us-container" style={{transform:"translateY(30px)", fontFamily:"Ubuntu"}}>
      <div className="contact-us-form">
        <h1>Contact Us</h1>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your Message" required onChange={(e)=>setMessage(e.target.value)}></textarea>
          </div>
          <button type="submit" onClick={handleEmail}>Send Message</button>
        </form>
        <div className="contact-us-info">
          <p>You can also reach us at <strong>ecotrack2024@gmail.com</strong> or call us at <strong>+91 8210431308</strong>.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
