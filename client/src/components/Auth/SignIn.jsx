import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { MdKeyboardArrowLeft } from "react-icons/md";

import Input from "../../utils/Input";

export default function SignIn({ setSignReq }) {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext); // Accede a setUserinfo desde el contexto

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: emailInput, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const userInfo = await response.json();
      //console.log("Login succesful, userInfo: ", userInfo);
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
    <div className="size mt-[6rem] text-center">
      <h2 className="text-2xl">Sign In With Email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[2rem]">
        Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum
        dui.
      </p>

      <form className="flex flex-col gap-4" onSubmit={login}>
        <Input
          type="email"
          title="email"
          value={emailInput}
          onChange={(value) => setEmailInput(value)}
        />
        <Input
          type="password"
          title="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <button className="px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto">
          Sign In
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign in options
      </button>
    </div>
  );
}
