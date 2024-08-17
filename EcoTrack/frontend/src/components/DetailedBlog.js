import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailedBlog() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const { blogId } = useParams();
  const [owner, setOwner] = useState("")

  useEffect(() => {
    const fetchFullBlog = async () => {
      try {
        // Fetch blog data
        const response = await axios.get(
          `http://localhost:8000/api/v4/blogs/${blogId}`,
          { withCredentials: true }
        );
        const data = response.data.data;
        console.log(data);

        setBlog(data);

        // Fetch likes
        const likesResponse = await axios.get(
          `http://localhost:8000/api/v4/likes/${blogId}`,
          { withCredentials: true }
        );
        console.log("likesResponse", likesResponse.data);
        
        setLikes(likesResponse.data.data.likesCount);

        // Fetch comments
        const commentsResponse = await axios.get(
          `http://localhost:8000/api/v4/comments/${blogId}`,
          { withCredentials: true }
        );
        console.log(commentsResponse.data.data.comment);
        setOwner(commentsResponse.data.data.comment[0].owner.fullName)
        setComments(commentsResponse.data.data.comment)
        
        // setComments(commentsResponse.data.comments);
      } catch (error) {
        console.error("Error fetching the blog data:", error);
      }
    };

    fetchFullBlog();
  }, [blogId]);

  if (!blog) {
    return (
      <div style={{ transform: "translateY(90px)", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ transform: "translateY(90px)", padding: "20px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {blog._doc.title}
        </h1>
        <p style={{ color: "#888", marginBottom: "30px" }}>
          By {blog.author} |{" "}
          {new Date(blog._doc.createdAt).toLocaleDateString()}
        </p>
        <img
          src={blog._doc.coverImage}
          alt={blog._doc.title}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />
        <div style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "#333" }}>
          {blog._doc.content.split("\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "15px" }}>
              {paragraph}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <div>
            <button
              className="btn btn-primary"
              style={{ borderRadius: "20px" }}
            >
              <i className="fa fa-heart"></i> {likes} Likes
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "15px", borderRadius: "20px" }}
            >
              <i className="fa fa-comment"></i> {comments.length} Comments
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary"
              style={{ borderRadius: "20px" }}
            >
              Share <i className="fa fa-share-alt"></i>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div style={{ marginTop: "40px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Comments
          </h2>
          <div style={{ lineHeight: "1.5", fontSize: "1.1rem", color: "#333" }}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {comment.owner.fullname}
                  </span> <span style={{fontSize:"0.9rem", color:"#888"}}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  <p>{comment.content}</p>
                  
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedBlog;
