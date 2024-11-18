import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Tiptap } from "../components/TipTap";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setDescription(postInfo.description);
        //setCover(postInfo.cover);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("description", description);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files[0]);
    }

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Error updating post:", errorData);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form className="" onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Tiptap description={description} setDescription={setDescription} />
      <button style={{ marginTop: "15px" }}>Update post</button>
    </form>
  );
}
