import { Link } from "react-router-dom";
import CartWidget from "./CartWidget.jsx";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">Camisas Sergio</Link>
      </h1>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/category/colecciones">Colecciones</Link>
        </li>
        <li>
          <Link to="/category/ofertas">Ofertas</Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
}

export default NavBar;
