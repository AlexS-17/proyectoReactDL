import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importamos useParams
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/CartContext';

const Pizza = () => {
  const [data, setData] = useState({});
  const { cart, setCart } = useContext(CartContext); // Usa el contexto para obtener el carrito y la función setCart

  // Capturamos el parámetro pizzaId de la URL
  const { pizzaId } = useParams();

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/pizzas/${pizzaId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching pizza data:', error);
    }
  };

  useEffect(() => {
    if (pizzaId) {
      getData();
    }
  }, [pizzaId]); // Volvemos a ejecutar el efecto si cambia pizzaId

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 mt-5">
      <h2 className="text-center">Descripción</h2>
      <p className="text-center">{data.desc}</p> {/* Muestra la descripción de la pizza */}
      <CardPizza pizza={data} />
      {/* Aquí puedes añadir tu footer */}
      <footer>
        {/* Tu contenido de footer aquí */}
      </footer>
    </div>
  );
};

export default Pizza;
