import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailcontainer.jsx";
import NotFound from "./components/NotFound.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Catálogo principal */}
        <Route
          path="/"
          element={
            <ItemListContainer greeting="Bienvenido a la colección de camisas de Sergio" />
          }
        />

        {/* Catálogo por categoría */}
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Filtra y elige tu estilo" />}
        />

        {/* Detalle */}
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />

        {/* 🛒 CARRITO (DEBE IR ANTES DEL *) */}
        <Route path="/cart" element={<Cart />} />

        {/* 🛒 CHECKOUT */}
       <Route path="/checkout" element={<CheckoutForm />} />



        {/* 404 SIEMPRE AL FINAL */}
        <Route path="*" element={<NotFound />} />

      


      </Routes>
    </>
  );
}

export default App;


