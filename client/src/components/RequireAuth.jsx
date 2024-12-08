import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext";

const RequireAuth = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  //console.log(userInfo);

  if (!userInfo) {
    // Si el usuario no está autenticado, redirigir a la página de login
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderiza el componente hijo
  return <Outlet />;
};

export default RequireAuth;
