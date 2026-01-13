import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/mockApi";
import ItemList from "./ItemList.jsx";

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProducts(categoryId)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [categoryId]); // importante: depende de la URL

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

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
}

export default ItemListContainer;
