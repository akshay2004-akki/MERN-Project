import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Webinar from './components/Webinar.js';
import About from './components/About.js';
import ContactUs from './components/ContactUs.js';
import Blog from './components/Blog.js'
import Tasks from './components/Tasks.js';
import Login from './components/Login.js';
import { useState, useEffect } from 'react';
import SignUp from './components/SignUp.js';
import Survey from './components/Survey.js';
import LogOut from './components/LogOut.js';

function App() {

  const [loggesIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedAvatar = localStorage.getItem('avatar');

    if (loggedIn) {
      setIsLoggedIn(true);
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar loggesIn={loggesIn} avatar={avatar} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/webinar' element={<Webinar/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contactUs' element={<ContactUs/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setAvatar={setAvatar} />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/survey' element={<Survey/>} />
        </Routes>
        {/* <LogOut/> */}
      </Router>
    </>
  );
}

export default App;
