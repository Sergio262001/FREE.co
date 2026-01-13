import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/mockApi";
import ItemDetail from "./ItemDetail.jsx";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProductById(itemId)
      .then((data) => setItem(data || null))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p className="loading">Cargando detalle...</p>;
  if (!item) return <p className="loading">Producto no encontrado.</p>;

  return (
    <section className="detail-container">
      <ItemDetail item={item} />
    </section>
  );
}

export default ItemDetailContainer;
