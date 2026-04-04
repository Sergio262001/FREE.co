import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PROMO_CONFIG } from "../config/promotions";
import "./promoModal.css";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Si la configuración maestra dicta que no se muestre, salimos.
    if (!PROMO_CONFIG.showWelcomeModal) return;

    // Usamos sessionStorage para mostrarlo solo una vez por ventana/sesión
    const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
    
    if (!hasSeenPromo) {
      // Le damos 1.5 segundos de gracia antes de lanzarlo
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPromo", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="promo-modal-overlay">
      <div className="promo-modal-content">
        <button className="promo-close" onClick={() => setIsOpen(false)} aria-label="Cerrar">
          &times;
        </button>
        <span className="promo-tag">OFERTA ESPECIAL</span>
        <h2>20% OFF</h2>
        <p>Regístrate ahora mismo y obtén un <strong>20% de descuento</strong> en toda tu primera compra usando el cupón <strong style={{ color: "var(--text-primary)"}}>BIENVENIDO20</strong>.</p>
        <div className="promo-actions">
          <Link to="/login" className="promo-btn primary" onClick={() => setIsOpen(false)}>Quiero mi descuento</Link>
          <button className="promo-btn secondary" onClick={() => setIsOpen(false)}>En otro momento</button>
        </div>
      </div>
    </div>
  );
}
