// src/pages/Cart.jsx
import React, { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext'; // Importar el contexto

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);

  // Calcular el total del carrito sumando los precios
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  return (
    <div className="cart">
      <h2>Tu carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <div className="cart-total">
            <hr />
            <h3>Total: ${cartTotal.toLocaleString()}</h3>
          </div>
          <button 
            className="btn btn-warning w-40 mt-3 p-2"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

