import React, { useContext, useEffect, useState } from 'react';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/CartContext';

const Pizza = () => {
  const [data, setData] = useState({});

  const { cart, setCart } = useContext(CartContext); // Usa el contexto para obtener el carrito y la función setCart

  const getData = async () => {
    const res = await fetch('http://localhost:5000/api/pizzas/p002');
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CardPizza
      pizza={data}
      
    />
  );
};

export default Pizza;


