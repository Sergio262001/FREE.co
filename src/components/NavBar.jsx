import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Camisas Sergio</h1>

      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Colecciones</a></li>
        <li><a href="#">Ofertas</a></li>
      </ul>

      <CartWidget />
    </nav>
  );
}

export default NavBar;