import React, { useEffect, useRef, useState } from "react";
import video from "../videos/invideo-ai-1080 EcoTrack_ Your Personal Guide to a Green 2024-08-11.mp4";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import axios from 'axios'
import image from '../Images/stock-vector-circular-economy-illustration-set-sustainable-economic-growth-strategy-recourses-reuse-and-reduce-2193150685.jpg'
// import {setKey, setLanguage, setRegion, fromLatLng} from 'react-geocode';

// Set the Google Maps Geocoding API key


Highcharts3D(Highcharts);

function Home() {

  const route = useNavigate();
  const handleRoute = () => {
    route("/about");
  };

  const contentRef = useRef([]);

  const [res, setRes] = useState("");

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  // const [address, setAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLon(longitude);
      console.log(latitude, longitude);
    });
    const generate = async () => {
      const options = {
        method: "GET",
        url: "https://map-geocoding.p.rapidapi.com/json",
        params: {
          latlng: `${lat}, ${lon}`,
        },
        headers: {
          "x-rapidapi-key":
            "cac67db0f1mshd481c4a651bea42p11b092jsn7781490d5532",
          "x-rapidapi-host": "map-geocoding.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.results[5].formatted_address);
        setRes(response.data?.results[5].formatted_address)
      } catch (error) {
        console.error(error);
      }
    };
    generate();
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
      text: "Your City's Carbon Emissions",
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
          [`${res}`, 30],
          ["Chandigarh", 15],
          ["Delhi", 55]
        ],
        colors: ["#FF8042", "#0088FE", "#f30c0c"], // Customize the colors
      },
    ],
  };
  const pieOptions = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      backgroundColor: 'lightgreen',
    },
    title: {
      text: "3D Pie Chart: India's CO2 Emissions",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%', // Show name and percentage on hover
          style: {
            color: '#000000',
          },
        },
        states: {
          hover: {
            enabled: true,
            brightness: 0.2, // Adjust brightness on hover
            halo: {
              size: 10,
              opacity: 0.25,
            },
          },
        },
      },
    },
    series: [
      {
        name: "India's CO2 Emissions",
        data: [
          { name: '2022 Increase', y: 6.52, color: 'yellow' },  // Increase with green color
          { name: '2021 Increase', y: 8.94, color: 'green' },  // Increase with green color
          { name: '2020 Decrease', y: 8.68, color: 'red' },    // Decrease with red color
          { name: '2019 Decrease', y: 1.25, color: 'lightblue' },    // Decrease with red color
          { name: '2018 Increase', y: 5.73, color: 'blue' },  // Increase with green color
          { name: '2017 Increase', y: 5.66, color: 'violet' },  // Increase with green color
        ],
      },
    ],
  };
  

  // 3D Bar Chart Configuration
  const barOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
      backgroundColor: 'lightpink',
      boxShadow : "lightpink"
    },
    title: {
      text: '3D Bar Chart: CO2 Emissions and Population',
    },
    xAxis: {
      categories: ['2022', '2021', '2020', '2019', '2018', '2017'],
      labels: {
        skew3d: true,
        style: {
          fontSize: '16px',
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    plotOptions: {
      column: {
        depth: 25,
      },
    },
    series: [
      {
        name: 'Fossil CO2 Emissions (tons)',
        data: [2693034100, 2528133480, 2320678660, 2541365980, 2573606310, 2434123800],
      },
      {
        name: 'Population (billions)',
        data: [1.425, 1.414, 1.403, 1.389, 1.375, 1.36],
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
        style={{
          height: '87vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '40px',
        }}
      >
        <div style={{ width: '50%', padding: '20px' }}>
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>
        <div style={{ width: '50%', padding: '20px' }}>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
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
          <img
            src={image}
            alt="a"
            style={{
              height: "350px",
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
