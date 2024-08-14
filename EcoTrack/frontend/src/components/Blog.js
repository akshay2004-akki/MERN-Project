import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Blog.css'; // Import the CSS

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v4/blogs/getAllBlogs');
        console.log(response);
         // Update the endpoint accordingly
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-container">
      {blogs && blogs.map((blog) => (
        <div key={blog._id} className="blog-card">
          {blog.coverImage && (
            <img src={blog.coverImage} alt={blog.title} className="blog-image" style={{width:"fit-content"}}/>
          )}
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">By: {blog.author.fullName}</p>
            <p className="blog-snippet">
              {blog.content.slice(0, 200)}... {/* Show a snippet of content */}
            </p>
            <div className="blog-meta">
              <span>{blog.likes} Likes</span> | <span>{blog.comments} Comments</span>
            </div>
            <button className="read-more">Read More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
