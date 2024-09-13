// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Estado del token inicializado en true

  const login = (token) => setToken(token);
  const logout = () => setToken(false); // Función para cerrar sesión

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
