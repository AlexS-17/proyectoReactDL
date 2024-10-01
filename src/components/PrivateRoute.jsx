import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ element }) => {
  const { token } = useUser(); // Obtiene el token del contexto

  return token ? element : <Navigate to="/login" />; // Si el token existe, muestra el elemento, si no, redirige a login
};

export default PrivateRoute;
