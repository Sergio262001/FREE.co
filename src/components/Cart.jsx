import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { PROMO_CONFIG } from "../config/promotions";
import "./cart.css";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice, discount, promoCode, setPromoCode, applyPromo } = useContext(CartContext);
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Carrito vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  const iva = totalPrice * 0.19;
  const envio = 15000;
  const totalBase = totalPrice + iva + envio;
  const totalBruto = totalBase * (1 - discount);

  return (
    <section className="cart-container">
      <h2 className="cart-title">Tu carrito</h2>

      {cart.map((p) => (
        <div key={`${p.id}-${p.size}`} className="cart-item">
          <img src={p.img} alt={p.title} className="cart-img" />

          <div className="cart-item-info">
            <h4>{p.title} - Talla: {p.size}</h4>
            <p>Precio: ${p.price.toLocaleString()}</p>
            <p>Cantidad: {p.qty}</p>
            <p className="cart-subtotal">
              Subtotal: ${(p.price * p.qty).toLocaleString()}
            </p>

            <button
              className="cart-remove"
              onClick={() => removeItem(p.id, p.size)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {PROMO_CONFIG.couponsEnabled && (
        <div style={{ padding: "16px", background: "var(--bg-secondary)", marginTop: "24px", display: "flex", gap: "8px" }}>
          <input 
            type="text" 
            placeholder="Código de descuento (Ej: BIENVENIDO20)" 
            value={promoCode} 
            onChange={(e) => setPromoCode(e.target.value)} 
            style={{ flex: 1, padding: "8px", border: "1px solid var(--border-light)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
          <button onClick={() => applyPromo(promoCode)} style={{ padding: "8px 16px", background: "var(--text-primary)", color: "var(--bg-primary)", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "11px" }}>APLICAR</button>
        </div>
      )}

      <div style={{ marginTop: "32px", borderTop: "1px solid var(--border-light)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>Subtotal: ${totalPrice.toLocaleString()}</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>IVA (19%): ${iva.toLocaleString()}</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>Envío Nacional: ${envio.toLocaleString()}</p>
        
        {discount > 0 && (
          <p style={{ fontSize: "14px", color: "green", margin: 0 }}>
            Descuento Promocional: -{discount * 100}%
          </p>
        )}
        
        <h3 className="cart-total" style={{ marginTop: "8px", fontSize: "1.5rem" }}>
          Total a Pagar: ${totalBruto.toLocaleString()}
        </h3>
      </div>

      <div className="cart-actions" style={{ marginTop: "24px" }}>
        <button className="cart-clear" onClick={clearCart}>
          Vaciar carrito
        </button>
        {user ? (
          <Link className="cart-checkout" to="/checkout">
            Ir a checkout
          </Link>
        ) : (
          <Link className="cart-checkout" to="/login" style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--text-primary)" }}>
            Inicia sesión para pagar
          </Link>
        )}
      </div>
    </section>
  );
}
