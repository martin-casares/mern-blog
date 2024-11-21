import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

  function logout() {
    fetch("http://localhost:4000/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null); // Al hacer logout, también actualiza el estado en el contexto
      navigate("/");
    });
  }

  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);

  //console.log(userInfo);
  return (
    <header
      className={`border-b border-black sticky top-0 z-50 
     ${isActive ? "bg-white" : "bg-banner"} transition-all duration-500 `}
    >
      <div className="size h-[70px] flex items-center justify-between">
        <Link to="/" className="h-[1.5rem] font-bold">
          Blog
        </Link>
        <nav className="flex  items-center gap-5">
          <div className="flex gap-5">
            <Link>About</Link>
            <Link>dos</Link>
            <Link>Contact</Link>
          </div>
          {userInfo ? ( // Si hay userInfo, muestra las opciones de usuario autenticado
            <div>
              <Link to="/create" className="m-5 mr-2">
                Create new post
              </Link>
              <a
                href="#"
                onClick={logout}
                className={`bg-black text-white rounded-full px-3 p-2 text-sm font-medium ${
                  isActive ? "bg-green-900" : "bg-black"
                }`}
              >
                Logout
              </a>
            </div>
          ) : (
            // Si no hay userInfo, mostramos las opciones de login/registro
            <>
              <div className="relative">
                <Link
                  to="/login"
                  className="ml-5 text-sm sm:flex items-center gap-5"
                >
                  Login
                </Link>
              </div>
              <Link
                to="/register"
                className="bg-black text-white rounded-full px-3 p-2 text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
