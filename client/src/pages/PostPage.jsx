import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import { UserContext } from "../UserContext.jsx";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMM d, yyy HH:mm")}</time>
      <div className="author">by @{postInfo.author.username}</div>

      {userInfo.id === postInfo.author._id && (
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
  );
}
