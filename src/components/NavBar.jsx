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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="#" aria-label="Instagram" style={{ display: 'flex', color: 'inherit' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" aria-label="TikTok" style={{ display: 'flex', color: 'inherit' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
          <a href="#" aria-label="WhatsApp" style={{ display: 'flex', color: 'inherit' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
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
