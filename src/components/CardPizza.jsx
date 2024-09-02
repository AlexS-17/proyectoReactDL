import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CardPizza = ({ pizza, addToCart }) => {

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return '';  // Asegúrate de que el valor sea una cadena
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!pizza) return null;  // Asegúrate de manejar el caso en el que 'pizza' es 'undefined'

  return (
    <div className="d-flex justify-content-center mt-3">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
        <Card.Body>
          <Card.Title>{capitalizeFirstLetter(pizza.name || '')}</Card.Title>
          <Card.Text>
            <strong>Precio:</strong> ${pizza.price || 'N/A'}
            <br />
            <strong>🍕Ingredientes:</strong>
          </Card.Text>
          <ul>
            {pizza.ingredients?.map((ingredient, index) => (
              <li key={index}>{capitalizeFirstLetter(ingredient || '')}</li>
            ))}
          </ul>
          <Button 
            variant="warning" 
            className="w-100"
            onClick={() => addToCart(pizza)}>
              Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardPizza;







