import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link para redirección
import { CartContext } from '../context/CartContext';

const CardPizza = ({ pizza }) => {

  // Importa la función 'addToCart' del contexto
  const { addToCart } = useContext(CartContext);

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return '';  // El valor debe ser un string
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!pizza) return null;  // Por si 'pizza' es 'undefined'

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
              Agregar al carrito
          </Button>

          <Link to={`/pizza/${pizza.id}`}>
            <Button variant="success" className="w-100">
              Ver Pizza
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardPizza;







