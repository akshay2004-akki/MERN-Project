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
import Profile from './components/Profile.js'
import CreateBlog from './components/CreateBlog.js';
import DetailedBlog from './components/DetailedBlog.js';
import MyBlogs from './components/MyBlogs.js';
import LeaderBoard from './components/LeaderBoard.js';
import WasteSegregation from './components/WasteSegregation.js';
import WasteDisposal from './components/WasteDisposal.js';
import SanitizationAwareness from './components/SanitizationAwareness.js';
import UserProfile from './components/UserProfile.js';

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
          <Route path='/survey' element={localStorage.getItem('surveyCompleted') ? <Home /> : <Survey />} />
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='/createBlog' element={<CreateBlog/>} />
          <Route path='/blogs/:blogId' element={<DetailedBlog/>} />
          <Route path='/myBlogs' element = {<MyBlogs/>} />
          <Route path='/leaderboard' element={<LeaderBoard/>} />
          <Route path='/wasteSegregation' element= {<WasteSegregation/>}/>
          <Route path='/wasteDisposal' element= {<WasteDisposal/>} />
          <Route path='/sanitizationAwareness' element={<SanitizationAwareness/>}/>
          <Route path='userProfile' element={<UserProfile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
