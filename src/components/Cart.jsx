import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Carrito vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <section className="cart-container">
      <h2 className="cart-title">Tu carrito</h2>

      {cart.map((p) => (
        <div key={p.id} className="cart-item">
          <img src={p.img} alt={p.title} className="cart-img" />

          <div className="cart-item-info">
            <h4>{p.title}</h4>
            <p>Precio: ${p.price}</p>
            <p>Cantidad: {p.qty}</p>
            <p className="cart-subtotal">
              Subtotal: ${p.price * p.qty}
            </p>

            <button
              className="cart-remove"
              onClick={() => removeItem(p.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <h3 className="cart-total">Total: ${totalPrice}</h3>

      <div className="cart-actions">
        <button className="cart-clear" onClick={clearCart}>
          Vaciar carrito
        </button>
        <Link className="cart-checkout" to="/checkout">
          Ir a checkout
        </Link>
      </div>
    </section>
  );
}
