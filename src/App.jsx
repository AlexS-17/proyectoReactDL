import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Pizza from './pages/Pizza';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <CartProvider> {/* Usamos el proveedor de contexto */}
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/pizza' element={<Pizza />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='404' element={<NotFound />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;



