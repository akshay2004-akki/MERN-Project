import axios from 'axios'
import { error } from 'highcharts'
import React, { useEffect, useState } from 'react'

function About() {

  const [data, setData] = useState("")

  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get("http://localhost:8000/api/v4/ai/getPrediction",{withCredentials:true})
            .then((res)=>{
              console.log(res.data.data);
              setData(res.data.data.replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>')
              .replace(/\n/g, '<br/>'))
              
            })
            .catch((error)=>{
              console.log(error.message);
              
            })
      
    }
    fetch()
  })
  return (
    <div style={{ transform: 'translateY(90px)', fontFamily:"Ubuntu", padding:"30px", fontSize:"21px" }} dangerouslySetInnerHTML={{ __html: data }} />
  )
}

export default About