import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/firestore";
import ItemDetail from "./ItemDetail.jsx";

function ItemDetailContainer() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    getProductById(itemId)
      .then((data) => {
        if (!mounted) return;
        if (!data) {
          setError("Producto no encontrado.");
          setItem(null);
        } else {
          // Formamos el arreglo de imágenes reales a mostrar (img + img2)
          const realImages = [data.img];
          if (data.img2) {
            realImages.push(data.img2);
          } else if (data.images && data.images.length > 1) {
            realImages.push(...data.images.slice(1));
          }

          // Si no tiene 'model3d', no simulamos nada
          setItem({
            ...data,
            images: realImages,
            model3d: data.model3d || null
          });
        }
      })
      .catch((e) => {
        console.error("Firestore getProductById error:", e);
        if (!mounted) return;
        setError("Error al cargar el producto.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [itemId]);

  if (loading) return <p className="loading">Cargando detalle...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <section className="detail-container">
      <ItemDetail item={item} />
    </section>
  );
}

export default ItemDetailContainer;
