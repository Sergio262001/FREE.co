import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailcontainer.jsx";
import NotFound from "./components/NotFound.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Collections from "./components/Collections.jsx";
import { Toaster } from "react-hot-toast";

import GlobalNav from "./components/GlobalNav.jsx";

function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-dark)',
            borderRadius: '0',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600'
          },
          success: {
            iconTheme: { primary: 'var(--text-primary)', secondary: 'var(--bg-primary)' },
          },
          error: {
            iconTheme: { primary: '#ff3333', secondary: '#ffffff' },
          }
        }} 
      />
      <NavBar />
      <GlobalNav />

      <Routes>
        {/* Catálogo principal */}
        <Route
          path="/"
          element={
            <ItemListContainer greeting="Bienvenido a la colección de camisas de Sergio" />
          }
        />

        {/* Vista oficial de Colecciones */}
        <Route path="/collections" element={<Collections />} />

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

        {/* Auth & Perfil */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* 404 SIEMPRE AL FINAL */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Chatbot />
    </>
  );
}

export default App;


