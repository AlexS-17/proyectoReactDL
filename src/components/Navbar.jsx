import { useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { MyLoginContext } from "../context/UserContext";

const Navbar = () => {
  const { token, logout } = useContext(MyLoginContext); 
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);

  if (token && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
    navigate('/');
  }

  if (!token && window.location.pathname === '/profile') {
    navigate('/login');
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Pizzería ¡Mamma Mía!
        </a>

        <Button className="btn btn-warning me-2" type="submit">
          <Link to="/" className="text-black ms-1 text-decoration-none">
            🍕 Inicio
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
              {token ? (
                <>
                  <Button className="btn btn-warning me-2" type="submit">
                    <Link to="/profile" className="text-black ms-1 text-decoration-none">
                      🔓 Perfil
                    </Link>
                  </Button>

                  {/* Requisito 6: el botón logout del navbar debe cerrar la sesión del usuario */}
                  <Button className="btn btn-warning" type="button" onClick={handleLogout}>
                    🔐 Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button className="btn btn-warning me-2" type="submit">
                    <Link to="/login" className="text-black ms-1 text-decoration-none">
                      🔐 Iniciar sesión
                    </Link>
                  </Button>

                  <Button className="btn btn-warning" type="submit">
                    <Link to="/register" className="text-black ms-1 text-decoration-none">
                      🔐 Crear cuenta
                    </Link>
                  </Button>
                </>
              )}
            </li>
          </ul>

          <div className="carrito ms-auto">
            <Button className="btn btn-warning" type="submit">
              <Link to="/cart" className="text-black ms-1 text-decoration-none">
                🛒 ${cartTotal.toLocaleString()}
              </Link>
            </Button>

            <div id="carrito" className="bg-white p-3">
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
                              onClick={() => decreaseQuantity(pizza.id)}
                            >
                              -
                            </button>

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
                    <span className="fw-bold">${cartTotal.toLocaleString()}</span>
                  </p>
                </>
              )}

              <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>
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
