import React, { useEffect, useState } from "react";
import axios from "axios";
//import './Blog.css'; // Import the CSS

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v4/blogs/getAllBlogs"
        );
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      className="blog-container fixed-top"
      style={{ transform: "translateY(90px)" }}
    >
      {blogs.length > 0 && (
        <div className="blogs-grid">
          <div className="featured-blog" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={blogs[0].coverImage}
                alt={blogs[0].title}
                className="featured-image"
              />
            </div>
            <h2 className="blog-title">{blogs[0].title}</h2>
            <p className="blog-author">By: {blogs[0].author.fullName}</p>
            <p className="blog-snippet">{blogs[0].content.slice(0, 100)}...</p>
            <div className="blog-meta">
              <span>{blogs[0].likes} Likes</span> |{" "}
              <span>{blogs[0].comments} Comments</span>
            </div>
          </div>

          <div className="other-blogs">
            {blogs.slice(1, 4).map((blog) => (
              <div key={blog._id} className="blog-card">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-snippet">{blog.content.slice(0, 60)}...</p>
                  <div className="blog-meta">
                    <span>{blog.likes} Likes</span> |{" "}
                    <span>{blog.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
