import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    alert("Haz iniciado sesión correctamente");

    // Al enviar el formulario, limpiamos los campos
    setEmail("");
    setPassword("");
    setError("");
  };

  return (

    // Formulario
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={validarDatos} className="formulario p-4 rounded w-100 mx-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
        {error && <p className="error text-light">{error}</p>}
        <h2>🍕 Bienvenido 🍕</h2>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control input-custom"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            maxLength={30}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control input-custom"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            maxLength={20}
          />
        </div>

        <button type="submit" className="btn btn-yellow w-100">
          Enviar
        </button>
      </form>
    </div>
  );
};


export default LoginForm;