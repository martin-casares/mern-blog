import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext); // Accede a setUserinfo desde el contexto

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email: emailInput, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const userInfo = await response.json();
      //      console.log("Login succesful, userInfo: ", userInfo);
      setUserInfo(userInfo); // Actualiza el contexto
      setRedirect(true);
    } else {
      alert("Wrong Credentials!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={emailInput}
        onChange={(ev) => setEmailInput(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="my-button">Login</button>
    </form>
  );
}
