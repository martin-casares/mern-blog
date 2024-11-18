import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/auth/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setUserInfo(null); // Deslogea si no es válido
        }
      })
      .then((userData) => {
        console.log("Datos del usuario cargados:", userData);
        setUserInfo(userData);
      })
      .catch(() => {
        console.log("Error al obtener el perfil del usuario.");
        setUserInfo(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
