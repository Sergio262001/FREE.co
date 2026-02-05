import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/firestore";
import ItemList from "./ItemList.jsx";

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  setLoading(true);

  getProducts(categoryId)
    .then((data) => {
      console.log("🟢 Products data:", data);
      setProducts(data);
    })
    .catch((err) => {
      console.error("🔴 Error getProducts:", err);
    })
    .finally(() => setLoading(false));
}, [categoryId]);

  return (
    <section className="item-list-container">
      <div className="item-list-header">
        <h2>{greeting}</h2>
        <p>
          {categoryId
            ? `Estás viendo: ${categoryId}`
            : "Elige una camisa para completar tu estilo."}
        </p>
      </div>

      {loading && <p className="loading">Cargando productos...</p>}
      {!loading && error && <p className="loading">{error}</p>}
      {!loading && !error && <ItemList products={products} />}
    </section>
  );
}

export default ItemListContainer;
