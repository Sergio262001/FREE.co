import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);
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
  const totalBruto = totalPrice + iva + envio;

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

      <div style={{ marginTop: "32px", borderTop: "1px solid var(--border-light)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>Subtotal: ${totalPrice.toLocaleString()}</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>IVA (19%): ${iva.toLocaleString()}</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>Envío Nacional: ${envio.toLocaleString()}</p>
        <h3 className="cart-total" style={{ marginTop: "8px", fontSize: "1.5rem" }}>
          Total Bruto: ${totalBruto.toLocaleString()}
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
