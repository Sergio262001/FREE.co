import Camiseta1 from "../assets/img/camisas/Camiseta1.webp";
import Camiseta2 from "../assets/img/camisas/Camiseta2.webp";
import Camiseta3 from "../assets/img/camisas/Camiseta3.webp";
import Camiseta4 from "../assets/img/camisas/Camiseta4.webp";

export const products = [
  {
    id: "1",
    title: "Camisa Blessd blanca",
    price: 25000,
    category: "colecciones",
    img: Camiseta1,
    images: [Camiseta1, Camiseta2, Camiseta3],
    model3d: "/models/Alienojodepez.glb",
    description: "Oversize, cómoda y fácil de combinar. (Vista 3D disponible)",
    stock: 8,
  },
  {
    id: "2",
    title: "Camisa negra Ptblling",
    price: 32000,
    category: "ofertas",
    img: Camiseta2,
    images: [Camiseta2, Camiseta4],
    description: "Negra, estilo casual para cualquier plan.",
    stock: 5,
  },
  {
    id: "3",
    title: "Camisa blanca Dairo oversize",
    price: 29000,
    category: "colecciones",
    img: Camiseta3,
    description: "Street y oversize. Ideal para look urbano.",
    stock: 10,
  },
  {
    id: "4",
    title: "Camisa Gang beige",
    price: 40000,
    category: "colecciones",
    img: Camiseta4,
    description: "Beige, fresca y con flow para el día a día.",
    stock: 3,
  },
];
