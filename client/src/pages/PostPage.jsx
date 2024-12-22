import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import { UserContext } from "../UserContext.jsx";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/comments/${id}`)
      .then((response) => response.json())
      .then(setComments);
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  function submitComment(e) {
    e.preventDefault();
    fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content: newComment, postId: id }),
    })
      .then((res) => res.json())
      .then((comment) => setComments((prev) => [comment, ...prev]));
  }

  return (
    <>
      <div className="">
        <h1>{postInfo.title}</h1>
        <time>{format(new Date(postInfo.createdAt), "MMM d, yyy HH:mm")}</time>
        <div className="author">by @{postInfo.author.username}</div>

        {userInfo && userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Link to={`/edit/${postInfo._id}`} className="edit-btn">
              Edit this post
            </Link>
          </div>
        )}
        <div className="image">
          <img alt="" src={`http://localhost:4000/${postInfo.cover}`} />
        </div>
        <h2>{postInfo.summary}</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id}>
            <strong>@{comment.author.username}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submitComment}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>
    </>
  );
}
