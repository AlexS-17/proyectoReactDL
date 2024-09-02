import React, { useEffect, useState } from 'react';
import CardPizza from '../components/CardPizza';

const Pizza = ({ cart, setCart }) => {
  const [data, setData] = useState({});

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


