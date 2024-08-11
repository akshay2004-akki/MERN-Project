import './App.css';
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Webinar from './components/Webinar.js';
import About from './components/About.js';
import ContactUs from './components/ContactUs.js';
import Blog from './components/Blog.js'
import WhatWeDo from './components/WhatWeDo.js';

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
          <Route path='/about' element={<About/>} />
          <Route path='/contactUs' element = {<ContactUs/>} />
          <Route path='/blog' element = {<Blog/>} />
          <Route path='/whatWeDo' element={<WhatWeDo/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
