import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // If there's no user, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const q = query(
            collection(db, "orders"),
            where("buyer.email", "==", user.email)
          );
          const snap = await getDocs(q);
          const userOrders = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(userOrders);
        } catch (error) {
          console.error("Error al obtener pedidos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", textTransform: "uppercase", fontSize: "2rem", marginBottom: "8px" }}>Mi Cuenta</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Conectado como: {user.email}</p>

      <button 
        onClick={handleLogout}
        style={{ padding: "12px 24px", border: "1px solid var(--border-dark)", background: "transparent", color: "var(--text-primary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", fontSize: "12px", cursor: "pointer", marginBottom: "40px" }}
      >
        Cerrar Sesión
      </button>

      <h3 style={{ fontFamily: "var(--font-heading)", textTransform: "uppercase", fontSize: "1.5rem", marginBottom: "20px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
        Historial de Pedidos
      </h3>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Aún no tienes pedidos registrados.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{ padding: "24px", border: "1px solid var(--border-light)", background: "var(--bg-secondary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ fontWeight: "600", margin: 0 }}>Pedido: {order.id}</p>
                <span style={{ padding: "4px 8px", background: "var(--text-primary)", color: "var(--bg-primary)", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
                  {order.status || "Completado"}
                </span>
              </div>

              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Fecha: {order.date ? new Date(order.date.seconds * 1000).toLocaleDateString() : "Reciente"}
              </p>

              {order.trackingNumber && (
                <div style={{ padding: "12px", background: "rgba(0,0,0,0.03)", border: "1px dashed var(--border-dark)", marginBottom: "16px", fontSize: "13px" }}>
                  <p style={{ margin: "0 0 6px 0" }}><strong>📍 Envío a:</strong> {order.shipping?.address}, {order.shipping?.city} (Telf: {order.shipping?.phone})</p>
                  <p style={{ margin: "0" }}><strong>📦 Guía de rastreo:</strong> <span style={{ fontFamily: "monospace", fontSize: "14px", letterSpacing: "1px" }}>{order.trackingNumber}</span></p>
                </div>
              )}
              
              <div style={{ paddingLeft: "16px", borderLeft: "2px solid var(--border-dark)", marginBottom: "16px" }}>
                {order.items.map((item, idx) => (
                  <p key={idx} style={{ fontSize: "14px", marginBottom: "4px" }}>
                    {item.qty}x {item.title} (Talla: {item.size || "N/A"}) - ${item.price}
                  </p>
                ))}
              </div>
              
              <p style={{ fontWeight: "600", fontSize: "1.1rem", margin: 0 }}>
                Total: ${Number(order.total).toFixed(2)}
                {order.discountPercent > 0 && <span style={{ fontSize: "12px", color: "var(--text-secondary)", marginLeft: "8px" }}>(Descuento aplicado)</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
