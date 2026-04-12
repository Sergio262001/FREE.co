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
          // Función para limpiar comillas accidentales
          const cleanUrl = (url) => (typeof url === 'string') ? url.replace(/^["']|["']$/g, '') : url;

          // Formamos el arreglo de imágenes reales a mostrar (img + img2)
          const realImages = [];
          
          if (Array.isArray(data.img)) {
            realImages.push(...data.img.map(cleanUrl));
          } else if (data.img) {
            realImages.push(cleanUrl(data.img));
          }

          if (data.img2) {
            realImages.push(cleanUrl(data.img2));
          } else if (data.images && data.images.length > 1 && !Array.isArray(data.img)) {
            realImages.push(...data.images.slice(1).map(cleanUrl));
          }

          // Obtenemos la imagen principal real (string) para el detalle
          const mainImgString = Array.isArray(data.img) && data.img.length > 0 ? data.img[0] : data.img;

          // Si no tiene 'model3d', no simulamos nada
          setItem({
            ...data,
            img: cleanUrl(mainImgString),
            images: realImages,
            model3d: cleanUrl(data.model3d) || null
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
