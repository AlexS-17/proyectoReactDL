import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PrivateRoute from './components/PrivateRoute';
import Profile from "./components/Profile";
import { useUser } from "./context/UserContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Pizza from "./pages/Pizza";
import RegisterForm from "./pages/RegisterForm";

function App() {
  const { token } = useUser(); // Obtener el token desde el contexto

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterForm />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginForm />} />
        <Route path="/pizza/:pizzaId" element={<Pizza />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


