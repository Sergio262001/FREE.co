import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "./checkout.css";

function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Completa todos los campos");
      return;
    }

    const order = {
      buyer: {
        name,
        email,
      },
      items: cart.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        qty: p.qty,
      })),
      total: totalPrice,
      date: serverTimestamp(),
    };

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Error al confirmar la compra");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Carrito vacío
  if (cart.length === 0 && !orderId) {
    return (
      <div className="checkout-container checkout-empty">
        <h2>El carrito está vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  // 🟢 Compra exitosa
  if (orderId) {
    return (
      <div className="checkout-container checkout-success">
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de orden es:</p>
        <strong>{orderId}</strong>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  // 🔵 Checkout normal
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
