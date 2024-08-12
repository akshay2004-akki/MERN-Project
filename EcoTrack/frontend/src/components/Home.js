import React, { useEffect, useRef, useState } from "react";
import video from "../videos/invideo-ai-1080 EcoTrack_ Your Personal Guide to a Green 2024-08-11.mp4";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import Geocode from 'react-geocode';

// Set the Google Maps Geocoding API key
Geocode.setKey('AIzaSyDo0xJ2MTxm8T8CSWrKs5Q8AfmQ0XU8saw');

// Optionally set the language and region (not necessary, but can be customized)
Geocode.setLanguage('en');
Geocode.setRegion('us');

Highcharts3D(Highcharts);

function Home() {
  const route = useNavigate();
  const handleRoute = () => {
    route("/about");
  };

  const contentRef = useRef([]);

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [address, setAddress] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLon(longitude);
      console.log(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    // Example coordinates
    // const lat = 40.73061;
    // const lng = -73.935242;

    Geocode.fromLatLng(lat, lon).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [lat, lon]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
          } else {
            entry.target.classList.remove("show");
            entry.target.classList.add("hide");
          }
        });
      },
      { threshold: 0.1 } // Adjust as needed
    );

    contentRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (contentRef.current) {
        contentRef.current.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      }
    };
  }, []);

  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      animation: {
        duration: 2000, // Duration in milliseconds
        easing: "easeOutBounce", // Easing function
      },
    },

    title: {
      text: "Global Carbon Emissions",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: "Emissions",
        data: [
          [`${address}`, 70],
          ["Others", 30],
        ],
        colors: ["#FF8042", "#0088FE"], // Customize the colors
      },
    ],
  };

  return (
    <>
      <div className="landing-page" style={{ height: "100vh" }}>
        <div
          className="content fade-in"
          ref={(el) => (contentRef.current[0] = el)}
          style={{
            transform: "translateY(100px)",
            textAlign: "left",
            padding: "10px",
          }}
        >
          <h1>Welcome to EcoTrack:</h1>
          <h2>Track Your Carbon Footprint & Make a Difference!</h2>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
            EcoTrack is your go-to platform for tracking and reducing your
            carbon footprint. By monitoring your daily activities, we help you
            make eco-friendly choices and contribute to a healthier planet. Join
            us in the journey to sustainability! <br />
            Join the journey towards a sustainable future. Monitor, reduce, and
            offset your carbon emissions with EcoTrack.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
      <div
        className="content2 fade-in"
        ref={(el) => (contentRef.current[1] = el)}
        style={{ height: "100vh" }}
      >
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
          </ul>
          <br />
          <br />
          <div className="btn btn-success" onClick={handleRoute}>
            Read More
          </div>
        </div>
        <div className="image">
          <video
            src={video}
            style={{
              height: "400px",
              width: "700px",
              borderRadius: "15px",
              border: "none",
            }}
            controls
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      <div
        className="content3"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "500",
        }}
      >
        <div
          className="working fade-in"
          ref={(el) => (contentRef.current[2] = el)}
        >
          <h2>How It Works:</h2>
          <div className="step">
            <h3>Step 1: Track Your Activities</h3>
            <p>
              Input your daily activities or sync with your apps to monitor your
              energy usage, transportation, and more.
            </p>
          </div>
          <div className="step">
            <h3>Step 2: Get Insights</h3>
            <p>
              Receive detailed reports and tips on how to reduce your carbon
              footprint based on your lifestyle.
            </p>
          </div>
          <div className="step">
            <h3>Step 3: Take Action</h3>
            <p>
              Participate in eco-friendly challenges, offset your emissions, and
              share your progress with the EcoTrack community.
            </p>
          </div>
        </div>
        <div
          className="video fade-in-left"
          ref={(el) => (contentRef.current[3] = el)}
        >
          <video
            src={video}
            autoPlay
            controls
            loop
            playsInline
            muted
            style={{
              height: "400px",
              width: "700px",
              borderRadius: "15px",
              border: "none",
            }}
          />
        </div>
      </div>
      <div
        className="content4"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          className="need fade-in"
          ref={(el) => (contentRef.current[4] = el)}
          style={{
            width: "700px",
            fontFamily: "Poppins",
            fontSize: "1.3rem",
            lineHeight: "1.6",
            fontWeight: "500",
          }}
        >
          <h2>Why Reduce Your Carbon Footprint?</h2>
          <p>
            Climate change is one of the biggest challenges facing our planet.
            By reducing your carbon footprint, you're taking an active role in
            protecting the environment, conserving natural resources, and
            ensuring a sustainable future for generations to come.
          </p>
          <h3>Statistics:</h3>
          <ul>
            <li>70% of global carbon emissions come from cities.</li>
            <li>
              Individual actions can collectively make a huge impact on global
              emissions.
            </li>
          </ul>
        </div>
        <div
          className="chart fade-in-left"
          ref={(el) => (contentRef.current[5] = el)}
          style={{ width: "40%", marginRight: "5%" }}
        >
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </>
  );
}

export default Home;
