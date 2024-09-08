import { useContext, useEffect, useState } from "react";
import "../App.css";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import { CartContext } from '../context/CartContext';
import { db } from "../data/db";

const Home = () => {
  const [data, setData] = useState(db);

  const { cart, setCart, maxQuantity } = useContext(CartContext); // Acá se utiliza el contexto para obtener el carrito y funciones

  const getData = async () => {
    const res = await fetch('http://localhost:5000/api/pizzas/')
    const data = await res.json()

    //console.log(data) 
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])
    


  // Función para agregar al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex(pizza => pizza.id === item.id);

    if (itemExists >= 0) {
      if(cart[itemExists].quantity >= maxQuantity) return // Si ya tiene la cantidad máxima no hace nada (al presionar el botón de agregar al carrito de la card)
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity += 1;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  return (
    <>
      <Header />

      <main className="container-xl mt5">
        <h2 className="text-center mt-5">Nuestras pizzas</h2>

        <div className="row mt-5">
          {data.map((pizza) => (
            <CardPizza
              key={pizza.id}
              pizza={pizza}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

