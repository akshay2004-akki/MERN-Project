import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import "./DetailedBlog.css"; // Import your CSS file

function DetailedBlog() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const { blogId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchFullBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v4/blogs/${blogId}`,
          { withCredentials: true }
        );
        const data = response.data.data;
        setBlog(data);

        const likesResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v4/likes/${blogId}`,
          { withCredentials: true }
        );
        setLikes(likesResponse.data.data.likesCount);

        const commentsResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v4/comments/${blogId}`,
          { withCredentials: true }
        );
        setComments(commentsResponse.data.data.comment);
      } catch (error) {
        console.error("Error fetching the blog data:", error);
      }
    };

    fetchFullBlog();
  }, [blogId]);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 50;
    const rotateY = -(x / rect.width) * 50;

    const shadowX = rotateY * 5;
    const shadowY = rotateX * 5;
    const shadowBlur = 20;
    const shadowColor = `rgba(0, 0, 0, 0.2)`;

    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    container.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    container.style.transform = "rotateX(0deg) rotateY(0deg)";
    container.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
  };

  if (!blog) {
    return (
      <div style={{ transform: "translateY(90px)", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{backgroundImage: `
      radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
      radial-gradient(circle at bottom right, rgba(138, 43, 226, 0.4), transparent 50%)
    `,backgroundColor: '#121212', height:"130vh"}}>
      <div style={{ transform: "translateY(90px)", padding: "20px" }}>
      <div
        className="detailed-blog-container"
      >
        <img
          src={blog._doc.coverImage}
          alt={blog._doc.title}
          className="detailed-blog-image"
          style={{objectFit:"contain"}}
        />
        <div className="detailed-blog-content-wrapper" style={{backgroundColor:"transparent",overflow:"scroll" }}>
          <h1 className="detailed-blog-title" style={{color:"#fff"}}>{blog._doc.title}</h1>
          <hr style={{backgroundColor:"#fff",}}/>
          <p className="detailed-blog-meta" style={{color:"#fff"}}>
            By <span style={{color:"aqua"}}>{blog.author} |{" "}</span>
            {new Date(blog._doc.createdAt).toLocaleDateString()}
          </p>
          <div className="detailed-blog-content">
            {blog._doc.content.split("\n").map((paragraph, index) => (
              <p key={index} style={{ marginBottom: "15px", color:"#fff"}}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="detailed-blog-buttons">
            <div>
              <button className="btn btn-primary detailed-blog-button">
                <i className="fa fa-heart"></i> {likes} Likes
              </button>
              <button
                className="btn btn-secondary detailed-blog-button"
                style={{ marginLeft: "15px" }}
              >
                <i className="fa fa-comment"></i> {comments.length} Comments
              </button>
            </div>
            <div>
              <button className="btn btn-outline-secondary detailed-blog-button" style={{color:"#fff"}}>
                Share <i className="fa fa-share-alt"></i>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="detailed-blog-comments">
            <h2 className="detailed-blog-title" style={{ fontSize: "1.8rem", color:"#fff" }}>
              Comments
            </h2>
            <div
              style={{ lineHeight: "1.5", fontSize: "1.1rem", color: "#333" }}
            >
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="detailed-blog-comment" style={{color:"#111"}}>
                    <span className="detailed-blog-comment-owner">
                      {comment.owner.fullname}
                    </span>
                    <span className="detailed-blog-comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    <p>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p style={{color:"#fff"}}>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DetailedBlog;
