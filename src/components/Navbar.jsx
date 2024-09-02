import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) => {
  const token = false; // Cambia esto a true para simular un usuario registrado

  // State derivado de cart
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  // Calcula el total del carrito sumando los precios
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Pizzería ¡Mamma Mía!
        </a>
        
        <Button className="btn btn-warning me-2" type="submit">
        <Link to="/" className="text-black ms-1 text-decoration-none">
        🍕 Home
        </Link>
        </Button>
        
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Condición si está logeado o no */}
              {token ? (
                <>
                  <Button className="btn btn-warning me-2" type="submit">
                    <Link to="/profile" className="text-black ms-1 text-decoration-none">
                    🔓 Profile
                    </Link>
                  </Button>

                  <Button className="btn btn-warning" type="submit">
                    <Link to="/logout" className="text-black ms-1 text-decoration-none">
                    🔐 Logout
                    </Link>
                  </Button>
                </>
              ) : (
                <>

                  <Button className="btn btn-warning me-2" type="submit">
                    <Link to="/login" className="text-black ms-1 text-decoration-none">
                    🔐 Login
                    </Link>
                  </Button>

                  <Button className="btn btn-warning" type="submit">
                    <Link to="/register" className="text-black ms-1 text-decoration-none">
                    🔐 Register
                    </Link>
                  </Button>
                </>
              )}
            </li>
          </ul>

          {/* Carrito */}
          <div className="carrito ms-auto">
            <Button className="btn btn-warning" type="submit">
              <Link to="/cart" className="text-black ms-1 text-decoration-none">
              🛒 ${cartTotal.toLocaleString()}
              </Link>
            </Button>

            <div id="carrito" className="bg-white p-3">
              {/* Si el carrito está vacío mostrar mensaje, sino mostrar tabla */}
              {isEmpty ? (
                <p>El carrito está vacío.</p>
              ) : (
                <>
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((pizza) => (
                        <tr key={pizza.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={pizza.img}
                              alt="imagen pizza"
                            />
                          </td>
                          <td>{pizza.name}</td>
                          <td className="fw-bold">
                            ${pizza.price.toLocaleString()}
                          </td>
                          <td className="flex align-items-start gap-4">
                            <button 
                            type="button" 
                            className="btn btn-dark"
                            onClick={() => decreaseQuantity(pizza.id)}>
                              -
                            </button>

                            {/* Muestra el total de elementos en el carrito */}
                            {pizza.quantity}

                            <button 
                            type="button" 
                            className="btn btn-dark"
                            onClick={() => increaseQuantity(pizza.id)}
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger" 
                              type="button"
                              onClick={() => removeFromCart(pizza.id)} 
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-end">
                    Total a pagar:{" "}
                    <span className="fw-bold">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </p>
                </>
              )}

              <button 
              className="btn btn-dark w-100 mt-3 p-2"
              onClick={clearCart}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
