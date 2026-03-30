import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/firestore";
import ItemList from "./ItemList.jsx";
import BannerCarousel from "./BannerCarousel.jsx";

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getProducts(categoryId)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("🔴 Error getProducts:", err);
        setError("Hubo un error cargando los productos");
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <>
      {!categoryId && <BannerCarousel />}
      
      <section className="item-list-container">
        {categoryId && (
          <div className="item-list-header">
            <h2 style={{ textTransform: "capitalize" }}>{categoryId.replace("-", " ")}</h2>
            <p>Explora la mejor selección para ti.</p>
          </div>
        )}

      {loading && (
        <div className="item-list">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-img"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-text medium"></div>
              <div className="skeleton-text long"></div>
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      )}
      {!loading && error && <p className="loading">{error}</p>}
      {!loading && !error && <ItemList products={products} />}
      </section>
    </>
  );
}

export default ItemListContainer;
