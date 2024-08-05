import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("")

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position){
      const { latitude, longitude } = position.coords;
      setLat(latitude)
      setLon(longitude)
      console.log(latitude,longitude);
      
    })
  },[])

  return (
    <>
      {lat} <br /> {lon}
    </>
  );
}

export default App;
