import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './CreateBlog.css'; // Assuming you have a CSS file for additional styles

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const route = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/blogs/create-blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsSuccess(true);
      setTimeout(() => {
        route("/blog");
      }, 1500); // Redirect after 1.5 seconds
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{height:"100vh", width:"100%", position:"absolute"}}>
      <div className="create-blog-container" style={{transform:"translateY(30px)"}}>
        {isLoading ? (
          <div className="loading-spinner">
            {/* Display a spinner or success animation */}
            {!isSuccess ? (
              <div className="spinner"></div>
            ) : (
              <div className="success-animation">Blog Posted Successfully!</div>
            )}
          </div>
        ) : (
          <>
            <h1 className="create-blog-title">Create a New Blog</h1>
            <form className="create-blog-form">
              <div className="form-group5">
                <label htmlFor="title">Blog Title</label>
                <input type="text" id="title" placeholder="Enter your blog title" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group5">
                <label htmlFor="content">Content</label>
                <textarea id="content" rows="5" placeholder="Write your blog content" onChange={(e) => setContent(e.target.value)}></textarea>
              </div>
              <div className="form-group5">
                <label htmlFor="coverImage">Cover Image</label>
                <input type="file" id="coverImage" onChange={(e) => setCoverImage(e.target.files[0])} />
              </div>
              <button type="submit" className="submit-button5" onClick={handleCreate}>Create Blog</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
