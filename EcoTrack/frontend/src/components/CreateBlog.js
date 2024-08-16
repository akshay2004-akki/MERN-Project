import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("")

  const route = useNavigate()


  const handleCreate = async (e)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage)

    await axios.post("http://localhost:8000/api/v4/blogs/create-blog", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials:true
    })
        .then((response)=>{
          console.log(response.data) 
          alert("Blog Posted");
          route("/blog")
        })
        .catch((error)=>{
          console.log(error.message);
        })

  }
  return (
    <div style={{height:"100vh", width:"100%", backgroundColor:"", position:"absolute"}}>
      <div className="create-blog-container" style={{transform:"translateY(30px)"}}>
      <h1 className="create-blog-title">Create a New Blog</h1>
      <form className="create-blog-form">
        <div className="form-group5">
          <label htmlFor="title">Blog Title</label>
          <input type="text" id="title" placeholder="Enter your blog title" onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="form-group5">
          <label htmlFor="content">Content</label>
          <textarea id="content" rows="5" placeholder="Write your blog content" onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
        <div className="form-group5">
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" id="coverImage" onChange={(e)=>setCoverImage(e.target.files[0])}/>
        </div>
        <button type="submit" className="submit-button5" onClick={handleCreate}>Create Blog</button>
      </form>
    </div>
    </div>
  );
};

export default CreateBlog;
