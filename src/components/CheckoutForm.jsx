import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PROMO_CONFIG } from "../config/promotions";
import "./checkout.css";

function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // 0 or 0.10

  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CONFIG.activeCoupons[code]) {
      const discountVal = PROMO_CONFIG.activeCoupons[code];
      setDiscount(discountVal);
      toast.success(`¡Descuento de ${discountVal * 100}% aplicado!`);
    } else {
      setDiscount(0);
      toast.error("Código promocional inválido");
    }
  };

  const iva = totalPrice * 0.19;
  const shippingCost = 15000;
  const rawTotal = totalPrice + iva + shippingCost;
  const finalTotal = rawTotal * (1 - discount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !city) {
      toast.error("Por favor completa todos los datos de envío y personales.");
      return;
    }

    if (!window.WidgetCheckout) {
      toast.error("El sistema de pagos Wompi aún no ha cargado. Intenta de nuevo.");
      return;
    }

    const amountInCents = Math.round(finalTotal * 100);
    const reference = `ORD-${Date.now()}`;
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY || "pub_test_Q5yDA9xoKdePzhX8s5zP32WZoaOQtzZk";

    setLoading(true);

    const checkout = new window.WidgetCheckout({
      currency: "COP",
      amountInCents: amountInCents,
      reference: reference,
      publicKey: publicKey,
    });

    checkout.open(async function (result) {
      setLoading(false); 
      const transaction = result.transaction;
      
      if (transaction.status === "APPROVED") {
        const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
        const order = {
          buyer: { name, email },
          shipping: { phone, address, city },
          items: cart.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            qty: p.qty,
            size: p.size || "N/A"
          })),
          subtotal: totalPrice,
          iva: iva,
          shippingCost: shippingCost,
          discountPercent: discount > 0 ? discount * 100 : 0,
          total: finalTotal,
          date: serverTimestamp(),
          paymentId: transaction.id,
          paymentMethod: transaction.paymentMethodType,
          trackingNumber: trackingNumber,
          status: "Preparando envío"
        };

        try {
          const docRef = await addDoc(collection(db, "orders"), order);
          setOrderId(docRef.id);
          clearCart();
          toast.success("Tu compra se registró con éxito.");
        } catch (error) {
          console.error("Error al crear la orden:", error);
          toast.error("Pago aprobado, pero hubo un error registrando tu envío.");
        }
      } else {
        toast.error("El pago no se completó (" + transaction.status + "). Intenta nuevamente.");
      }
    });
  };

  if (!user) {
    return (
      <div className="checkout-container checkout-empty">
        <h2>Sesión Requerida</h2>
        <p>Debes iniciar sesión con tu cuenta para pagar.</p>
        <Link to="/login" style={{ display: "inline-block", marginTop: "16px", background: "var(--text-primary)", color: "var(--bg-primary)", padding: "12px 24px", fontWeight: "600", letterSpacing: "1px", textDecoration: "none" }}>IR A LOGIN</Link>
      </div>
    );
  }

  if (cart.length === 0 && !orderId) {
    return (
      <div className="checkout-container checkout-empty">
        <h2>El carrito está vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="checkout-container checkout-success">
        <h2>¡Compra exitosa!</h2>
        <p>Tu orden ha sido confirmada con éxito.</p>
        <p style={{ marginTop: "16px", color: "var(--text-secondary)" }}>Guía de seguimiento asignada:</p>
        <strong style={{ fontSize: "1.2rem", letterSpacing: "1px" }}>Revisa "Mi Cuenta" para rastrearla.</strong>
        <Link style={{ marginTop: "24px" }} to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout Seguro</h2>

      {PROMO_CONFIG.couponsEnabled && (
        <div style={{ padding: "16px", background: "var(--bg-secondary)", marginBottom: "24px", display: "flex", gap: "8px" }}>
          <input 
            type="text" 
            placeholder="Código de descuento (Ej: BIENVENIDO20)" 
            value={promoCode} 
            onChange={(e) => setPromoCode(e.target.value)} 
            style={{ flex: 1, padding: "8px", border: "1px solid var(--border-light)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
          <button onClick={applyPromo} style={{ padding: "8px 16px", background: "var(--text-primary)", color: "var(--bg-primary)", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "11px" }}>APLICAR</button>
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h4 style={{ marginBottom: "-8px", marginTop: "8px" }}>Tus Datos</h4>
        <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Teléfono celular" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <h4 style={{ marginBottom: "-8px", marginTop: "16px" }}>Dirección de Envío</h4>
        <input type="text" placeholder="Dirección exacta" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />

        <div style={{ marginTop: "24px", borderTop: "1px solid var(--border-light)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "14px" }}>
            <span>Subtotal:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "14px" }}>
            <span>IVA (19%):</span>
            <span>${iva.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "14px" }}>
            <span>Envío:</span>
            <span>${shippingCost.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", color: "green", fontSize: "14px", marginTop: "8px" }}>
              <span>Descuento Promocional:</span>
              <span>-{discount * 100}%</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", marginTop: "12px", paddingTop: "8px", borderTop: "1px solid var(--border-light)" }}>
            <span>Total a pagar:</span>
            <strong>${finalTotal.toLocaleString()}</strong>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: "24px" }}>
          {loading ? "Procesando..." : "Confirmar PAGO"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
