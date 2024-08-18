import axios from 'axios';
// import { Axis } from 'highcharts';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyBlogs() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("")

    useEffect(()=>{
        try {
            const fetchUserBlogs = async ()=>{
                const response = await axios.get("http://localhost:8000/api/v4/blogs/getPosts", {withCredentials:true})
                console.log(response.data);
                if(response.data.data.length===0){
                    setMessage(response.data.message)
                    // 
                }else{
                    setData(response?.data?.data)
                }
            }
            fetchUserBlogs()
        } catch (error) {
            console.log(error.message);
            
        }
        
    },[])

    const route = useNavigate()

    const handleNav = (blogId)=>{
        route(`/blogs/${blogId}`);
    }

    const handleDelete = async (blogId)=>{
        try {
            await axios.delete(`http://localhost:8000/api/v4/blogs/${blogId}`, {withCredentials:true})
                    .then((response)=>{
                        alert("Blog deleted Successfully")
                        // window.location.reload()
                    })
                    .catch((error)=>{
                        alert(error.message)
                    })
        } catch (error) {
            
        }
    }

  return (
    <div className="my-blogs-container" style={{transform:"translateY(90px)"}}>
            <h1>My Blogs</h1>
            {
                message? <h2>{message}</h2> : ""
            }
            <div className="blogs-grid2">
                {data?.map((blog) => (
                    <div key={blog._id} className="blog-card2">
                        <img src={blog.coverImage} alt={blog.title} className="blog-cover-image2" />
                        <div className="blog-content2">
                            <h2 className="blog-title2">{blog.title}</h2>
                            <p className="blog-author2">By: {blog.author.fullName} | {new Date(blog.createdAt).toLocaleDateString()} </p>
                            <p className="blog-excerpt2">{blog.content.substring(0, 100)}...</p>
                            <button className="btn btn-success" onClick={()=>handleNav(blog._id)}>Read More</button>
                            <button className="mx-4 btn btn-danger" onClick={()=>handleDelete(blog._id)}> <i className="fa-solid fa-trash"></i> </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

  )
}

export default MyBlogs