import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v4/blogs/getAllBlogs",
          {
            withCredentials: true,
          }
        );

        const blogsWithLikes = await Promise.all(
          response.data.data.map(async (blog) => {
            const likesResponse = await axios.get(
              `http://localhost:8000/api/v4/likes/${blog._id}`,
              {
                withCredentials: true,
              }
            );
            const { likesCount } = likesResponse.data.data;
            return { ...blog, likes: likesCount };
          })
        );

        setBlogs(blogsWithLikes);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleLikeToggle = async (blogId) => {
    try {
      // Toggle the like
      await axios.post(
        `http://localhost:8000/api/v4/likes/toggle/t/${blogId}`,
        {},
        { withCredentials: true }
      );

      // Fetch the updated likes
      const updatedLikesResponse = await axios.get(
        `http://localhost:8000/api/v4/likes/${blogId}`,
        {
          withCredentials: true,
        }
      );

      const { likesCount } = updatedLikesResponse.data.data;

      // Update the specific blog's likes in the blogs state
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, likes: likesCount } : blog
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const route = useNavigate();

  const handleCreateBlog = ()=>{
    route("/createBlog")
  }

  return (
    <div
      className="blog-container fixed-top"
      style={{ transform: "translateY(80px)" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", position:"absolute", top:"7px", left:"40px" }}>
        <button className="btn btn-success" onClick={handleCreateBlog} style={{borderRadius:"20px", fontSize:"25px"}}>
        <i class="fa-brands fa-blogger"></i> <i class="fa-solid fa-plus"></i>    
        </button>
      </div>
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
            <p className="blog-snippet">
              <p className="blog-author">By: {blogs[0].author.fullName}</p>
              <span style={{color:"#000", fontWeight:"600"}}>{blogs[0].content.slice(0, 100)}...</span> <br />
              <span>{blogs[0].likes} Likes</span> |{" "}
              <span>{blogs[0].comments} Comments</span> <br />
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  className="like-button btn btn-primary"
                  onClick={() => handleLikeToggle(blogs[0]._id)}
                >
                  <i className="fa fa-heart"></i>
                </button>
                <button className="btn btn-primary">
                  <i className="fa-solid fa-comment"></i>
                </button>
              </div>
            </p>
          </div>

          <div className="other-blogs" style={{height:"90vh", overflow:"scroll"}}>
            <div>
              {blogs.slice(1, 4).map((blog) => (
              <div key={blog._id} className="blog-card">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-author">By: {blog.author.fullName}</p>
                  <p className="blog-snippet" style={{color:"#000", fontWeight:"600"}}>{blog.content.slice(0, 60)}...</p>
                  <div className="blog-meta">
                    <span>{blog.likes} Likes</span> |{" "}
                    <span>{blog.comments} Comments</span>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <button
                      className="like-button btn btn-primary"
                      onClick={() => handleLikeToggle(blog._id)}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-comment"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
