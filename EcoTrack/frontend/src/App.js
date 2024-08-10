import './App.css';
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Webinar from './components/Webinar.js';

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
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/webinar' element = {<Webinar/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
