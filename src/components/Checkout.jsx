// src/components/Checkout.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Checkout = () => {
  const { checkout } = useContext(UserContext);
  const cart = [/* tus productos */];

  const handleCheckout = async () => {
    const result = await checkout(cart);
    console.log(result);
  };

  return (
    <button onClick={handleCheckout}>Finalizar Compra</button>
  );
};

export default Checkout;
