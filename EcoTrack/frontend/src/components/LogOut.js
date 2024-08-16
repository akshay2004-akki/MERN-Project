import axios from 'axios'
// import { error } from 'highcharts'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function LogOut() {
    const route = useNavigate()
    const handleLogOut = async()=>{
        await axios.post("http://localhost:8000/api/v4/users/logout",{},{withCredentials : true})
            .then((res)=>{
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('avatar');
                localStorage.removeItem("surveyCompleted")
                alert(res.data.message);
                route("/login")
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error.message);
                
            })
    }

  return (
    <button className='btn btn-danger' onClick={handleLogOut}>LogOut</button>
  )
}

export default LogOut