import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemCount from "./ItemCount.jsx";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "./itemDetail.css";

function ItemDetail({ item }) {
  const { addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  
  // Configure images array
  const productImages = item?.images && item.images.length > 0 ? item.images : (item?.img ? [item.img] : []);
  const [mainImage, setMainImage] = useState(productImages[0] || "");
  
  // Set the main image if item changes
  useEffect(() => {
    setMainImage(productImages[0] || "");
  }, [item]);

  // View state: false = Photos, true = 3D
  const [view3D, setView3D] = useState(false);

  // Size state
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["S", "M", "L", "XL"];

  if (!item) return null;

  const handleAdd = (qty) => {
    if (!selectedSize) {
      toast.error("Selecciona una talla antes de añadir al carrito.");
      return;
    }
    addItem({ ...item, size: selectedSize }, qty);
    setAdded(true);
    toast.success("Prenda añadida al carrito!");
  };

  const handleBuyNow = (qty) => {
    if (!selectedSize) {
      toast.error("Selecciona una talla antes de comprar.");
      return;
    }
    addItem({ ...item, size: selectedSize }, qty);
    navigate("/cart");
  };

  return (
    <motion.div 
      className="detail-card"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* LEFT: Media Container */}
      <div className="detail-media">
        {item.model3d && (
          <div className="view-toggle">
            <button 
              className={!view3D ? "active-toggle" : ""} 
              onClick={() => setView3D(false)}
            >
              Ver Fotos
            </button>
            <button 
              className={view3D ? "active-toggle" : ""} 
              onClick={() => setView3D(true)}
            >
              Ver 3D
            </button>
          </div>
        )}

        {view3D && item.model3d ? (
          <div className="model-container">
            <model-viewer 
              src={item.model3d} 
              ar 
              camera-controls 
              auto-rotate
              shadow-intensity="1"
              style={{ width: "100%", height: "400px", borderRadius: "12px", backgroundColor: "#f9f9f9" }}
            >
            </model-viewer>
          </div>
        ) : (
          <div className="gallery-container">
            <div className="main-image-container">
              {mainImage && <img src={mainImage} alt={item.title} className="main-image" />}
            </div>
            {productImages.length > 1 && (
              <div className="thumbnails">
                {productImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${item.title} ${idx + 1}`}
                    className={`thumbnail ${mainImage === imgUrl ? "active-thumb" : ""}`}
                    onClick={() => setMainImage(imgUrl)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Info */}
      <div className="detail-info">
        <h2 className="detail-title">{item.title}</h2>
        <p className="detail-desc">{item.description}</p>
        <p className="detail-price">${item.price}</p>

        <div className="size-selector">
          <p>Talla:</p>
          <div className="size-options">
            {sizes.map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? "active-size" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {!added ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ItemCount
              stock={item.stock}
              initial={1}
              onAdd={handleAdd}
              onBuyNow={handleBuyNow}
            />
          </div>
        ) : (
          <Link className="go-cart" to="/cart">
            Ir al carrito
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default ItemDetail;
