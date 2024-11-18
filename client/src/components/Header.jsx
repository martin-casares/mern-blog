import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  function logout() {
    fetch("http://localhost:4000/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null); // Al hacer logout, también actualiza el estado en el contexto
      navigate("/");
    });
  }

  //console.log(userInfo);
  return (
    <header>
      <Link to="/" className="logo">
        Blog
      </Link>
      <nav>
        {userInfo ? ( // Si hay userInfo, muestra las opciones de usuario autenticado
          <>
            <Link to="/create">Create new post</Link>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          // Si no hay userInfo, mostramos las opciones de login/registro
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
