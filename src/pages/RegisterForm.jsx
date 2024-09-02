import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    alert("Formulario enviado correctamente");

    // Al enviar el formulario, limpiamos los campos
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (

    // Formulario
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={validarDatos} className="formulario p-4 rounded w-100 mx-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
        {error && <p className="error text-light">{error}</p>}
        <h2>🍕 Formulario de registro 🍕</h2>

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

        <div className="form-group mb-3">
          <label>Confirmar Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control input-custom"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
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


export default RegisterForm;