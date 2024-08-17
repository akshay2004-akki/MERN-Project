import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentingBlogId, setCommentingBlogId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //const [CommentCount, setCommentCount] = useState(0)

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
            // console.log(blogs);

            const likesResponse = await axios.get(
              `http://localhost:8000/api/v4/likes/${blog._id}`,
              {
                withCredentials: true,
              }
            );
            const { likesCount } = likesResponse.data.data;

            const res = await axios.get(
              `http://localhost:8000/api/v4/comments/${blog._id}`,
              { withCredentials: true }
            );
            const totalComments = res.data.data.totalComments;
            console.log(totalComments);

            return { ...blog, likes: likesCount, totalComments: totalComments };
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
      await axios.post(
        `http://localhost:8000/api/v4/likes/toggle/t/${blogId}`,
        {},
        { withCredentials: true }
      );

      const updatedLikesResponse = await axios.get(
        `http://localhost:8000/api/v4/likes/${blogId}`,
        {
          withCredentials: true,
        }
      );

      const { likesCount } = updatedLikesResponse.data.data;

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, likes: likesCount } : blog
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const fetchComments = async (blogId, page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v4/comments/${blogId}?page=${page}`,
        { withCredentials: true }
      );
      setComments(response.data.data.comment);
      setCurrentPage(response.data.data.currentPage);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentToggle = (blogId) => {
    setCommentingBlogId((prevBlogId) =>
      prevBlogId === blogId ? null : blogId
    );
    fetchComments(blogId); // Fetch comments when the comment section is toggled
  };

  const handleCommentSubmit = async (blogId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v4/comments/${blogId}`,
        { content: commentText },
        { withCredentials: true }
      );
      setCommentText("");
      fetchComments(blogId); // Refresh comments after submitting a new one
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const route = useNavigate();

  const handleCreateBlog = () => {
    route("/createBlog");
  };

  const handleReadMore = (blogId) => {
    route(`/blogs/${blogId}`);
  };

  return (
    <div
      className="blog-container fixed-top"
      style={{
        transform: "translateY(80px)",
        padding: "30px",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          position: "absolute",
          top: "7px",
          left: "40px",
        }}
      >
        <button
          className="btn btn-success"
          onClick={handleCreateBlog}
          style={{ borderRadius: "20px", fontSize: "25px" }}
        >
          <i className="fa-brands fa-blogger"></i>{" "}
          <i className="fa-solid fa-plus"></i>
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
              <span style={{ color: "#000", fontWeight: "600" }}>
                {blogs[0].content.slice(0, 100)}...
              </span>{" "}
              <br />
              <span>{blogs[0].likes} Likes</span> |{" "}
              <span>{blogs[0].totalComments} Comments</span> <br />
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  className="like-button btn btn-primary"
                  onClick={() => handleLikeToggle(blogs[0]._id)}
                >
                  <i className="fa fa-heart"></i>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleCommentToggle(blogs[0]._id)}
                >
                  <i className="fa-solid fa-comment"></i>
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleReadMore(blogs[0]._id)}
                >
                  Read More
                </button>
              </div>
              {commentingBlogId === blogs[0]._id && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(blogs[0]._id)}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </div>
              )}
              {commentingBlogId === blogs[0]._id && comments.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h4>Comments:</h4>
                  <ul style={{ paddingLeft: "0" }}>
                    {comments.map((comment) => (
                      <li
                        key={comment._id}
                        style={{ listStyleType: "none", marginBottom: "10px" }}
                      >
                        <strong>{comment.owner.fullname}:</strong>{" "}
                        {comment.content}
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#888",
                          }}
                        >
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {currentPage < totalPages && (
                    <button
                      onClick={() =>
                        fetchComments(blogs[0]._id, currentPage + 1)
                      }
                    >
                      Load more comments
                    </button>
                  )}
                </div>
              )}
            </p>
          </div>

          <div
            className="other-blogs"
            style={{ height: "90vh", overflow: "scroll" }}
          >
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
                    <p
                      className="blog-snippet"
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      {blog.content.slice(0, 60)}...
                    </p>
                    <div className="blog-meta">
                      <span>{blog.likes} Likes</span> |{" "}
                      <span>{blog.totalComments} Comments</span>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <button
                        className="like-button btn btn-primary"
                        onClick={() => handleLikeToggle(blog._id)}
                      >
                        <i className="fa fa-heart"></i>
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCommentToggle(blog._id)}
                      >
                        <i className="fa-solid fa-comment"></i>
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleReadMore(blog._id)}
                      >
                        Read More
                      </button>
                    </div>
                    {commentingBlogId === blog._id && (
                      <div style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment"
                          style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <button
                          onClick={() => handleCommentSubmit(blog._id)}
                          className="btn btn-success"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {commentingBlogId === blog._id && comments.length > 0 && (
                      <div style={{ marginTop: "20px" }}>
                        <h4>Comments:</h4>
                        <ul style={{ paddingLeft: "0" }}>
                          {comments.map((comment) => (
                            <li
                              key={comment._id}
                              style={{
                                listStyleType: "none",
                                marginBottom: "10px",
                              }}
                            >
                              <strong>{comment.owner.fullname}:</strong>{" "}
                              {comment.content}
                              <span
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "#888",
                                }}
                              >
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {currentPage < totalPages && (
                          <button
                            onClick={() =>
                              fetchComments(blog._id, currentPage + 1)
                            }
                          >
                            Load more comments
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              {blogs.slice(4).map((blog) => (
                <div key={blog._id} className="blog-card">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="blog-image"
                  />
                  <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-author">By: {blog.author.fullName}</p>
                    <p
                      className="blog-snippet"
                      style={{ color: "#000", fontWeight: "600" }}
                    >
                      {blog.content.slice(0, 60)}...
                    </p>
                    <div className="blog-meta">
                      <span>{blog.likes} Likes</span> |{" "}
                      <span>{blog.totalComments} Comments</span>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <button
                        className="like-button btn btn-primary"
                        onClick={() => handleLikeToggle(blog._id)}
                      >
                        <i className="fa fa-heart"></i>
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCommentToggle(blog._id)}
                      >
                        <i className="fa-solid fa-comment"></i>
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleReadMore(blog._id)}
                      >
                        Read More
                      </button>
                    </div>
                    {commentingBlogId === blog._id && (
                      <div style={{ marginTop: "10px" }}>
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment"
                          style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <button
                          onClick={() => handleCommentSubmit(blog._id)}
                          className="btn btn-success"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {commentingBlogId === blog._id && comments.length > 0 && (
                      <div style={{ marginTop: "20px" }}>
                        <h4>Comments:</h4>
                        <ul style={{ paddingLeft: "0" }}>
                          {comments.map((comment) => (
                            <li
                              key={comment._id}
                              style={{
                                listStyleType: "none",
                                marginBottom: "10px",
                              }}
                            >
                              <strong>{comment.owner.fullname}:</strong>{" "}
                              {comment.content}
                              <span
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "#888",
                                }}
                              >
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {currentPage < totalPages && (
                          <button
                            onClick={() =>
                              fetchComments(blog._id, currentPage + 1)
                            }
                          >
                            Load more comments
                          </button>
                        )}
                      </div>
                    )}
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
