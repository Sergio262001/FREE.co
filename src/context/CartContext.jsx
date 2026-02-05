import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); 
  // item en cart: { id, title, price (number), img, qty, stock }

  const addItem = (item, qty) => {
    const quantity = Number(qty);

    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      // IMPORTANTÍSIMO: price numérico
      const cleanPrice = Number(item.price);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + quantity, price: cleanPrice } : p
        );
      }

      return [...prev, { ...item, price: cleanPrice, qty: quantity }];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCart([]);

  const totalUnits = useMemo(
    () => cart.reduce((acc, p) => acc + Number(p.qty), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + Number(p.price) * Number(p.qty), 0),
    [cart]
  );

  const getItemSubtotal = (id) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return 0;
    return Number(item.price) * Number(item.qty);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalUnits,
        totalPrice,
        getItemSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
