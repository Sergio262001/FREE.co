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
          // --- DATOS DE PRUEBA (DUMMY) PARA DEMOSTRACIÓN ---
          // Si el producto en Firebase no tiene 'images', le agregamos unas de prueba
          const mockImages = [
            data.img,
            "https://picsum.photos/400/500?random=" + data.id + "1",
            "https://picsum.photos/400/500?random=" + data.id + "2"
          ];
          // Si no tiene 'model3d', le ponemos el astronauta de prueba
          const mockModel = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

          setItem({
            ...data,
            images: data.images || mockImages,
            model3d: data.model3d || mockModel
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
