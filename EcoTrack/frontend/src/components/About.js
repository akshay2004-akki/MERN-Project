import axios from "axios";
import React, { useEffect, useState } from "react";
import loader from "../videos/vecteezy_loading-circle-icon-on-white-background-4k_2850198.mp4";

function About() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v4/ai/getPrediction",
          { withCredentials: true }
        );
        console.log(res.data.data);
        const formattedData = res.data.data
          .replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>')
          .replace(/\n/g, "<br/>");
        setData(formattedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "30px",
          }}
        >
          <video src={loader} style={{ height: "100px", width: "100px" }} autoPlay loop></video>
        </div>
      ) : (
        <div
          style={{
            transform: "translateY(90px)",
            fontFamily: "Ubuntu",
            padding: "30px",
            fontSize: "21px",
          }}
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </>
  );
}

export default About;
