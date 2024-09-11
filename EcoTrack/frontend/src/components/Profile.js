import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const extractEmissionsData = (htmlString) => {
  const data = {};
  const regex =
    /\* <strong class="highlight">([^<]+)<\/strong>.*?(\d+)\s*kg CO2\/year/g;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    const key = match[1].trim();
    const value = parseFloat(match[2]);
    data[key] = value;
  }

  return data;
};

function Profile() {
  const [url, setUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [emissionsData, setEmissionsData] = useState({});
  const [isPopupVisible, setPopupVisible] = useState(false); // New state for pop-up visibility

  useEffect(() => {
    const avatar = localStorage.getItem("avatar");
    setUrl(avatar);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      await axios
        .get("http://localhost:8000/api/v4/users/user-details", {
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data.data;
          const name = data.fullName;
          const mail = data.email;
          const date = data.createdAt;

          setFullName(name);
          setEmail(mail);
          setJoinDate(new Date(date).toLocaleDateString());
        })
        .catch((error) => {
          console.log(error.response?.data);
        });
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v4/ai/getPrediction",
          { withCredentials: true }
        );
        const formattedData = res.data.data
          .replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>')
          .replace(/\n/g, "<br/>")
          .replace(/tonnes/g, "kg")
          .replace(/CO2 per year/gi, "CO2/year") // Replaces "CO2 per year" with "CO2/year" (case-insensitive)
          .replace(/CO2e per year/gi, "CO2/year")
          .replace(/CO2e/gi, "CO2/year")
          .replace(/CO2 \/ year/gi, "CO2/year") // Replaces "CO2 / year" with "CO2/year" (handles spaces)
          .replace(/CO2e \/ year/gi, "CO2/year")
          .replace(/CO2\/year/gi, "CO2/year") // Replaces "CO2/year" with "CO2/year" (ensures consistency)
          .replace(/\bCO2\b(?!\/year)/gi, "CO2/year");

        setData(formattedData);
        const extractedData = extractEmissionsData(formattedData);
        setEmissionsData(extractedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: Object.keys(emissionsData),
    datasets: [
      {
        label: `${fullName}'s CO2 Emissions (kg/year)`,
        data: Object.values(emissionsData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(emissionsData),
    datasets: [
      {
        label: `${fullName}'s CO2 Emissions (kg/year)`,
        data: Object.values(emissionsData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",  // Change text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.label + ": " + tooltipItem.raw + " kg CO2/year";
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",  // Change text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} kg CO2/year`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",  // Change X-axis labels to white
        },
      },
      y: {
        ticks: {
          color: "#fff",  // Change Y-axis labels to white
        },
      },
    },
  };

  const handlePopup = () => {
    setPopupVisible(!isPopupVisible); // Toggle pop-up visibility
  };

  const route = useNavigate();
  const handleNav = () => {
    route("/myBlogs");
  };

  return (
    <div style={{
      backgroundImage: `
      radial-gradient(circle at top right, rgba(138, 43, 226, 0.4), transparent 50%),
      radial-gradient(circle at bottom right, rgba(138, 43, 226, 0.4), transparent 50%)
    `,backgroundColor: '#121212', height:"100vh"
    }}>
    <div
    style={{
      transform: "translateY(90px)",
      display: "flex",
      gap: "30px",
      fontFamily: "Ubuntu",
      padding: "10px",
    }}
  >
    <div
      style={{
        height: "87vh",
        width: "20%",
        borderRadius: "20px",
        fontSize: "14px",
        color:"#fff"
      }}
    >
      <div
        className="profile-image"
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <img
          src={`${url}`}
          alt=""
          style={{ height: "300px", width: "300px", borderRadius: "50%" }}
        />
      </div>
      <div className="details" style={{ padding: "20px" }}>
        <p>
          {" "}
          <strong>Name</strong> : {fullName}
        </p>
        <p>
          <strong>Email</strong> : {email}
        </p>
        <p>
          {" "}
          <strong>Joined on</strong> : {joinDate}
        </p>
        <p>
          <strong>Member for</strong> :{" "}
          {new Date().getFullYear() - new Date(joinDate).getFullYear()} years{" "}
          {Math.floor(
            (new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24)
          )}
          days
        </p>
        <button className="btn btn-primary mx-2" onClick={handleNav}>
          My Blogs
        </button>
        <LogOut />
      </div>
    </div>

    <div
      style={{
        height: "83vh",
        width: "73%",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "30px",
        borderRadius: "20px",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "400px", height: "400px", marginBottom: "30px" }}
        >
          <h4 style={{color:"#fff"}}>{fullName}'s CO2 Emissions Breakdown</h4>
          <Pie data={pieChartData} options={pieOptions} />
        </div>
        <div style={{ width: "500px", height: "300px" }}>
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>
      <br />

      <button onClick={handlePopup} className="btn btn-primary" style={{width:"20%"}}>
        Show Analyzed Data
      </button>

      {isPopupVisible && (
        <>
          {/* Overlay div */}
          <div
            style={{
              position: "fixed",
              top: "-90px",
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Dim black background
              zIndex: "999", // Ensure it's behind the popup but in front of the content
            }}
            onClick={handlePopup} // Allow clicking outside to close the popup
          ></div>

          {/* Popup div */}
          <div
            className="prediction-popup"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "10px",
              zIndex: "1000", // Ensure it's on top of the overlay
              width: "70%",
              height: "70vh",
              overflow: "scroll",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <button
              onClick={handlePopup}
              style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </>
      )}
    </div>
  </div></div>
  );
}

export default Profile;
