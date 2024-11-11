import React, { useState, useCallback } from "react";
import {Navigate} from "react-router-dom";
import { Tiptap } from "../components/TipTap";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Función para manejar el submit del formulario
  async  function createNewPost (ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("description", description);
    data.append("file", files[0]);
          
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
	
    })
      if (response.ok) {
        setRedirect(true);
      }
  };

    if (redirect) {
      return <Navigate to={"/"} />
    }

  return (
    <form className="" onSubmit={createNewPost}>
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
      <input  type="file" onChange={ev => setFiles(ev.target.files) } />
      <Tiptap setDescription={setDescription} />
      <button style={{marginTop: "15px"}}>Create post</button>
    </form>
  );
}
