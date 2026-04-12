import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function ShirtCard({ shirt }) {
  const [isHovered, setIsHovered] = useState(false);

  // Decide which image to show
  const productImages = [shirt.img];
  if (shirt.img2) {
    productImages.push(shirt.img2);
  } else if (shirt?.images && shirt.images.length > 1) {
    productImages.push(shirt.images[1]);
  }


  return (
    <motion.article
      className="shirt-card"
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {shirt.category === "ofertas" && (
        <span className="badge-oferta">SALE</span>
      )}

      <Link
        to={`/item/${shirt.id}`}
        style={{ display: "block", position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="shirt-img"
          src={productImages[0]}
          alt={shirt.title}
          style={{ width: "100%", display: "block", transition: isHovered ? "opacity 0.8s ease-in-out 1.2s" : "opacity 0.3s ease-in-out", opacity: isHovered && productImages.length > 1 ? 0 : 1 }}
        />
        {productImages.length > 1 && (
          <img
            src={productImages[1]}
            alt={`${shirt.title} alternate`}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, opacity: isHovered ? 1 : 0, transition: isHovered ? "opacity 0.8s ease-in-out 1.2s" : "opacity 0.3s ease-in-out" }}
          />
        )}
      </Link>

      <div className="shirt-info">
        <h3 className="shirt-title">{shirt.title}</h3>
        <p className="shirt-price">${shirt.price}</p>
        <p className="shirt-category">{shirt.category}</p>

        <Link className="shirt-link" to={`/item/${shirt.id}`}>
          Comprar
        </Link>
      </div>
    </motion.article>
  );
}

export default ShirtCard;
