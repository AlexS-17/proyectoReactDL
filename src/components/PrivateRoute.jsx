import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  const { token } = useUser(); // Asegúrate de que useUser devuelva un objeto con 'token'
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
