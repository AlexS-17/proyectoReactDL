import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
export const MyLoginContext = createContext();

// Hook personalizado `useUser` para acceder al contexto
export const useUser = () => {
  return useContext(MyLoginContext); // Esto permite que los componentes accedan al contexto
};

// Definir el proveedor del contexto
export const UserProvider = ({ children }) => { // Cambia el nombre aquí
  const [token, setToken] = useState(""); // Guardar el token
  const [email, setEmail] = useState(""); // Guardar el email del usuario
  const [usuario, setUsuario] = useState(null); // Guardar la información del usuario

  // Restaurar token desde localStorage al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (storedToken) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []); // Se ejecuta solo una vez al cargar el componente

  // Efecto que se ejecuta cuando el token cambia para obtener la información del usuario
  useEffect(() => {
    if (token) {
      obtenerUser(token);
    }
  }, [token]);

  // Función para registrar un nuevo usuario (requisito 1)
  async function register(email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data && data.token) {
        alert(`Usuario ${data.email} registrado`);
        setEmail(data.email);
        setToken(data.token); // Guardamos el token en el estado
        localStorage.setItem("token", data.token); // Guardar el token en localStorage
        localStorage.setItem("email", data.email); // Guardar el email en localStorage
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  }

  // Función para iniciar sesión (requisito 1)
  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data && data.token) {
        alert("Sesión iniciada");
        setEmail(data.email);
        setToken(data.token); 
        localStorage.setItem("token", data.token); 
        localStorage.setItem("email", data.email); 
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  // Función para obtener la información del usuario autenticado (requisito 3)
  async function obtenerUser(token) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await response.json();
      setUsuario(data); // Guardamos la información del usuario en el estado
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }

  // Función para cerrar sesión (requisito 2)
  function logout() {
    setToken(""); 
    setEmail(""); 
    setUsuario(null); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("email"); 
  }

  // Retornamos el contexto con los valores y funciones
  return (
    <MyLoginContext.Provider
      value={{ token, email, usuario, register, login, logout }}
    >
      {children}
    </MyLoginContext.Provider>
  );
};

export default UserProvider; // Cambia la exportación a UserProvider
