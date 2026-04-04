import { Link, useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [theme, setTheme] = useState("dark");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={theme === "dark" ? "/logos/LG-BLANCO-SNFNDO-CORTO.png" : "/logos/LG-NEGRO-SNFNDO-CORTO.png"} alt="Logo" style={{ height: '110px', objectFit: 'contain' }} />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/collections">Colecciones</Link>
        </li>
        <li>
          <Link to="/category/ofertas">Ofertas</Link>
        </li>
        <li>
          <Link to={user ? "/profile" : "/login"}>
            {user ? "Mi Cuenta" : "Login"}
          </Link>
        </li>
      </ul>

      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button
          onClick={toggleTheme}
          style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderBottom: '1px solid currentColor',
            paddingBottom: '2px'
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        <CartWidget />
      </div>
    </nav>
  );
}

export default NavBar;
