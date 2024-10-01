import { useContext, useEffect, useState } from "react";
import "../App.css";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import { CartContext } from '../context/CartContext';
import { db } from "../data/db";

const Home = () => {
  const [data, setData] = useState(db);
  const { cart, setCart, maxQuantity } = useContext(CartContext);

  const getData = async () => {
    const res = await fetch('http://localhost:5000/api/pizzas/');
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  function addToCart(item) {
    const itemExists = cart.findIndex(pizza => pizza.id === item.id);

    if (itemExists >= 0) {
      if(cart[itemExists].quantity >= maxQuantity) return;
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
            <div className="col-md-4" key={pizza.id}> {/* Cambiado para usar col-md-4 */}
              <CardPizza
                pizza={pizza}
                setCart={setCart}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
