import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -------------------------------------------------------------
// ⚙️ CONFIGURACIÓN DE TUS BANNERS
// -------------------------------------------------------------
// Aquí puedes agregar, quitar o modificar los banners que rotan.
// - img: La ruta de tu foto (asegúrate de guardarla en la carpeta public/banners/)
// - title: El texto que aparecería escrito encima de la foto
const banners = [
  { img: `${import.meta.env.BASE_URL}banners/banner_1.png`, title: "Nueva Colección" },
  { img: `${import.meta.env.BASE_URL}banners/banner_2.png`, title: "Premium Archive" },
  { img: `${import.meta.env.BASE_URL}banners/banner_3.png`, title: "Streetwear Drops" }
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  useEffect(() => {
    // ⏱️ TIEMPO DEL CARRUSEL:
    // Aquí puedes modificar los milisegundos que dura cada foto en pantalla.
    // Actualmente está en 8000 (8 segundos). Si la quieres más rápida, pon 4000 (4 seg).
    const timer = setInterval(() => {
      nextSlide();
    }, 8000); 
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleDragEnd = (e, { offset }) => {
    if (offset.x < -50) nextSlide();
    else if (offset.x > 50) prevSlide();
  };

  return (
    <div style={{ width: "100%", height: "min(40vh, 450px)", minHeight: "250px", position: "relative", overflow: "hidden", backgroundColor: "#000" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={banners[currentIndex].img}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, cursor: "grab" }}
          alt="Banner Promocional"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        />
      </AnimatePresence>
      
      {/* 
        -------------------------------------------------------------
        📝 TEXTO DEL BANNER Y SOMBRA OSCURA (OCULTOS)
        -------------------------------------------------------------
        Si en algún momento futuro deseas que tus banners vuelvan a tener 
        letras grandes escritas por encima (como "Nueva Colección") y una 
        sombra oscura para que resalten, puedes programar aquí un <div/> que 
        lea {banners[currentIndex].title}. (Elemento oculto actualmente a 
        petición del equipo de diseño para mantener la foto limpia).
      */}

      {/* Manual Left/Right Arrows */}
      <button 
        onClick={prevSlide}
        style={{ position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "1.2rem", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(4px)" }}
        aria-label="Anterior"
      >
        &#10094;
      </button>

      <button 
        onClick={nextSlide}
        style={{ position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "1.2rem", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(4px)" }}
        aria-label="Siguiente"
      >
        &#10095;
      </button>

      {/* Navigation Dots */}
      <div style={{ position: "absolute", bottom: "30px", display: "flex", width: "100%", justifyContent: "center", gap: "12px", zIndex: 10 }}>
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", background: currentIndex === idx ? "#fff" : "rgba(255,255,255,0.4)", padding: 0, transition: "background 0.3s" }}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
