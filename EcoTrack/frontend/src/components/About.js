import React from 'react';
// import './About.css'; // Make sure you have this CSS file or style it accordingly
import arya from '../Images/WhatsApp Image 2023-01-04 at 14.41.10.jpg'
import abdul from '../Images/PHOTO.jpg'
import akshay from '../Images/resume pic3.jpeg'
import akash from '../Images/akash.jpg'
import akanksha from '../Images/akanksha.jpg'
import adrash from '../Images/adrash.jpg'

function About() {
  return (
    <div className="about-container" style={{
      backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom right, rgba(138, 43, 226, 0.4), transparent 50%)
      `,
      backgroundColor: '#121212'
     }}>
      <div className="about-content" style={{transform: "translateY(40px)"}}>
        <h1 className="about-title" style={{borderRadius:"30px"}}>Welcome to <span style={{color:"aqua"}}>EcoTrack</span></h1>
        <p className="about-description">
          At EcoTrack, our mission is to empower individuals and organizations to track their carbon footprint and make informed decisions to reduce their impact on the environment. We provide cutting-edge tools and analytics that help you understand your environmental impact, offering personalized suggestions to lead a more sustainable life.
        </p>
        <p className="about-description">
          Join us on our journey to make the world a greener place, one step at a time. Whether you're an individual looking to make a difference or a business aiming to achieve sustainability goals, EcoTrack is your partner in this vital mission.
        </p>
      </div>
      <br />
      <br />
      <h2 style={{ textAlign: "center", color:"#fff" }}>Our Team</h2> <br />
      <div className="image-gallery">
        <div className="gallery-item">
          <img  src={arya} alt="Team Member 1" className="gallery-image" />
          <div className="image-text">Aarya Ratnam: Project Manager</div>
        </div>
        <div className="gallery-item">
          <img  src={akshay} alt="Team Member 2" className="gallery-image" />
          <div className="image-text">Akshay Anand: Lead Developer</div>
        </div>
        <div className="gallery-item">
          <img  src={abdul} alt="Team Member 3" className="gallery-image" />
          <div className="image-text">Abdul Fater: UX/UI Designer</div>
        </div>
        <div className="gallery-item">
          <img  src={akash} alt="Team Member 4" className="gallery-image" />
          <div className="image-text">Akash Kumar: Sustainability Expert</div>
        </div>
      </div>
    </div>
  );
}

export default About;
