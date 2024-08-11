import React from "react";
import video from '../videos/invideo-ai-1080 EcoTrack_ Your Personal Guide to a Green 2024-08-11.mp4'
import { useNavigate } from "react-router-dom";
function Home() {
  const route = useNavigate();
  const handleRoute = ()=>{
    route("/about")
  }
  return (
    <>
      <div className="landing-page" style={{ height: "100vh" }}>
        <div
          className="content"
          style={{
            transform: "translateY(100px)",
            color: "white",
            textAlign: "left",
            padding: "10px",
          }}
        >
          <h1>Welcome to EcoTrack : </h1>
          <h2>Track Your Carbon Footprint & Make a Difference!</h2>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
            EcoTrack is your go-to platform for tracking and reducing your
            carbon footprint. By monitoring your daily activities, we help you
            make eco-friendly choices and contribute to a healthier planet. Join
            us in the journey to sustainability! <br />
            Join the journey towards a sustainable future. Monitor, reduce, and
            offset your carbon emissions with EcoTrack
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
      <div className="content2" style={{ height: "100vh" }}>
        <div className="about">
          <h2>What is EcoTrack?</h2>
          <p>
            EcoTrack is your personal guide to reducing your carbon footprint.
            Our platform helps you track your daily activities, monitor your
            impact on the environment, and provides actionable insights to help
            you live more sustainably.
          </p>
          <h3>Key Features:</h3>
          <ul>
            <li>Personalized Carbon Footprint Calculation</li>
            <li>Actionable Tips to Reduce Emissions</li>
            <li>Community Challenges and Leaderboards</li>
            <li>Real-time Impact Tracking</li>
          </ul> <br /><br />
          <div className="btn btn-success" onClick={handleRoute}>Read More</div>
        </div>
        <div className="image">
          <video src={video} style={{height:"400px", width:"700px", borderRadius:"15px"}} controls autoPlay/>
        </div>
      </div>
    </>
  );
}

export default Home;
