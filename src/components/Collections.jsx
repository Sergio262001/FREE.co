import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collectionsData = [
  { id: "basicos", title: "Colección Básicos", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  { id: "streetwear", title: "Streetwear Drops", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" },
  { id: "ofertas", title: "Special Archive (SALE)", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800" }
];

export default function Collections() {
  return (
    <div style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", textTransform: "uppercase", fontSize: "2rem", marginBottom: "32px", textAlign: "center" }}>
        Nuestras Colecciones
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {collectionsData.map((col, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <Link to={`/category/${col.id}`} style={{ textDecoration: "none", color: "inherit", display: "block", position: "relative", overflow: "hidden" }}>
              <img 
                src={col.img} 
                alt={col.title} 
                style={{ width: "100%", height: "450px", objectFit: "cover", transition: "transform 0.4s ease" }} 
                onMouseOver={e => e.currentTarget.style.transform="scale(1.05)"} 
                onMouseOut={e => e.currentTarget.style.transform="scale(1)"} 
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                <h3 style={{ color: "#fff", margin: 0, fontSize: "1.5rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>{col.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
