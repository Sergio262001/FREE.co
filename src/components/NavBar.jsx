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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" aria-label="TikTok" style={{ display: 'flex', color: 'inherit' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
          <a href="#" aria-label="WhatsApp" style={{ display: 'flex', color: 'inherit' }}>
            <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path strokeWidth="24" d="M84.2,216.5A103.8,103.8,0,0,1,128,224c57.4,0,104-46.6,104-104S185.4,16,128,16,24,62.6,24,120A101.5,101.5,0,0,0,36,170.6L24.6,218.4a7.9,7.9,0,0,0,9.7,9.7Z"></path>
              <path strokeWidth="18" transform="translate(18, 10) scale(0.88)" d="M92.5,84.5l8.7,8.7a16.1,16.1,0,0,1,1.5,21.3l-10,12.5a69.5,69.5,0,0,0,34.4,34.4l12.5-10a16.1,16.1,0,0,1,21.3,1.5l8.7,8.7a16,16,0,0,1,1,21.8l-7.7,8.6a32.1,32.1,0,0,1-32,8A112.1,112.1,0,0,1,49.2,118.3a32.1,32.1,0,0,1,8-32.1l8.6-7.7A16,16,0,0,1,92.5,84.5Z"></path>
            </svg>
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
