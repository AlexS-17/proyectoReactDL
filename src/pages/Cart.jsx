import React, { useContext, useMemo, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setCart } = useContext(CartContext);
  const { token } = useUser();
  const [showModal, setShowModal] = useState(false); // Estado para la modal

  // Calcular el total del carrito
  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cart]
  );

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return ''; // El valor debe ser un string
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Función para realizar la compra
  const comprar = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en los headers
        },
        body: JSON.stringify({
          cart: cart, // Enviar el carrito como JSON
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Compra realizada con éxito.");
        setCart([]); // Vaciar el carrito después de una compra exitosa
      } else {
        alert(result.error || "Hubo un problema con la compra.");
      }
    } catch (error) {
      console.error("Error en la compra:", error);
      alert("Ocurrió un error al procesar la compra.");
    }
  };

  // Función para manejar la confirmación de pago
  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleConfirmPayment = () => {
    setShowModal(false);
    comprar();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Clase min-vh-100 para ocupar todo el alto */}
      <div className="container mt-5 flex-grow-1"> {/* Clase flex-grow-1 para que crezca y ocupe el espacio disponible */}
        <h2 className="mb-4">Tu carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            {/* Tabla para mostrar los elementos del carrito */}
            <Table responsive bordered className="text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Producto</th>
                  <th>Nombre</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="align-middle">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        style={{ width: '100px' }} 
                      />
                    </td>
                    <td className="align-middle">{capitalizeFirstLetter(item.name)}</td>
                    <td className="align-middle">${item.price.toLocaleString('es-CL')}</td> {/* Formato chileno */}
                    <td className="align-middle">
                      <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id)}>+</Button>
                    </td>
                    <td className="align-middle">${(item.price * item.quantity).toLocaleString('es-CL')}</td> {/* Formato chileno */}
                    <td className="align-middle">
                      <div className="d-flex justify-content-center">
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Posicionar el total y los botones */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h5 className="text-right mr-3">
                Total: ${cartTotal.toLocaleString('es-CL')}
              </h5>
              <div>
                <Button 
                  variant="light" 
                  className="m-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
                <Button 
                  variant="success" 
                  disabled={!token} 
                  onClick={handlePayClick} // Cambiar a función para abrir la modal
                >
                  Pagar
                </Button>
              </div>
            </div>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar Pago</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas realizar el pago?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button variant="warning" onClick={handleConfirmPayment}>
                  Confirmar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
