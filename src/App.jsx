import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Catálogo principal */}
        <Route
          path="/"
          element={<ItemListContainer greeting="Bienvenido a la colección de camisas de Sergio" />}
        />

        {/* Catálogo filtrado por categoría (ruta dinámica) */}
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Filtra y elige tu estilo" />}
        />

        {/* Detalle de producto (ruta dinámica) */}
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
