import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Cart from './pages/Cart';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Pizza from './pages/Pizza';
import RegisterForm from './pages/RegisterForm';

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [cart, setCart] = useState(initialCart);

  const maxQuantity = 10;
  const minQuantity = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(id) {
    const updatedCart = cart.filter(pizza => pizza.id !== id);
    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < maxQuantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > minQuantity) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    if (cart.length === 0) return;
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      setCart([]);
    }
  }

  return (
    <>
      <Navbar 
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <Routes>
        <Route path='/' element={
          <Home 
            cart={cart} 
            setCart={setCart} 
            maxQuantity={maxQuantity}
          />} 
        />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/pizza' element={<Pizza />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='404' element={<NotFound />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;



