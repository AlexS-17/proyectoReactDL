import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-4">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Pizzería ¡Mamma Mía!</h5>
            <p>
              Las mejores pizzas de la ciudad, hechas con ingredientes frescos y una receta secreta.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces útiles</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white">Inicio</a>
              </li>
              <li>
                <a href="#" className="text-white">Menú</a>
              </li>
              <li>
                <a href="#" className="text-white">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Redes Sociales</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-white">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-white">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Pizzería ¡Mamma Mía! | Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
