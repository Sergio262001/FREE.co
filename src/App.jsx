import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import Camiseta1 from "./assets/img/camisas/Camiseta1.webp";
import Camiseta2 from "./assets/img/camisas/Camiseta2.webp";
import Camiseta3 from "./assets/img/camisas/Camiseta3.webp";
import Camiseta4 from "./assets/img/camisas/Camiseta4.webp";


function App() {
  const mensajeBienvenida = "Bienvenido a la colección de camisas de Sergio";

  const shirts = [
    {
      id: 1,
      title: "Camisa Blessd blanca",
      price: 25,
      category: "Básicas",
      img: Camiseta1,
    },
    {
      id: 2,
      title: "Camisa negra Ptblling",
      price: 32,
      category: "Casual",
      img: Camiseta2,
    },
    {
      id: 3,
      title: "Camisa blanca Dairo oversize",
      price: 29,
      category: "Street",
      img: Camiseta3,
    },
    {
      id: 4,
      title: "Camisa Gang beige",
      price: 40,
      category: "Verano",
      img: Camiseta4,
    },
  ];

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={mensajeBienvenida} products={shirts} />
    </>
  );
}

export default App;