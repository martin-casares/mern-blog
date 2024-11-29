import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import Input from "../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { UserContext } from "../../UserContext";

export default function SignUp({ setSignReq }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserInfo } = useContext(UserContext);

  function validatePasswords() {
    if (password !== repassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }

  async function register(ev) {
    ev.preventDefault();

    if (!username || !email || !password || !repassword) {
      return alert("All fields are required");
    }

    // Validación de coincidencia de contraseñas
    if (password !== repassword) {
      return alert("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.text(); // Obtén el texto del error
        throw new Error(error);
      }

      const userInfo = await response.json(); // Obtén la respuesta del backend
      setUserInfo(userInfo); // Actualiza el contexto con la información del usuario
      setRedirect(true);
      alert("Registration successful, you are now logged in!");
    } catch (err) {
      console.error("Registration failed:", err.message);
      alert("Registration failed: " + err.message);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-2xl">Sign up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[2rem]">
        Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum
        dui.
      </p>

      <form className="flex flex-col gap-4" onSubmit={register}>
        <Input
          type="text"
          title="username"
          value={username}
          onChange={(value) => setUsername(value)}
        />
        <Input
          type="email"
          title="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <Input
          type="password"
          title="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            validatePasswords();
          }}
        />
        <Input
          type="password"
          title="repassword"
          value={repassword}
          onChange={(value) => {
            setRePassword(value);
            validatePasswords();
          }}
        />
        <button className="px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto">
          Sign Up
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign up options
      </button>
    </div>
  );
}
