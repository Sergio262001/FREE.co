import { createContext, useMemo, useState } from "react";
import { PROMO_CONFIG } from "../config/promotions";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); 
  // item en cart: { id, title, price (number), img, qty, stock }

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = (localCode) => {
    const uppercaseCode = localCode.trim().toUpperCase();
    if (PROMO_CONFIG.activeCoupons[uppercaseCode]) {
      const discountVal = PROMO_CONFIG.activeCoupons[uppercaseCode];
      setDiscount(discountVal);
      setPromoCode(uppercaseCode);
      toast.success(`¡Descuento de ${discountVal * 100}% aplicado!`);
    } else {
      setDiscount(0);
      toast.error("Código promocional inválido");
    }
  };

  const addItem = (item, qty) => {
    const quantity = Number(qty);

    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id && p.size === item.size);

      // IMPORTANTÍSIMO: price numérico
      const cleanPrice = Number(item.price);

      if (exists) {
        return prev.map((p) =>
          (p.id === item.id && p.size === item.size) 
            ? { ...p, qty: p.qty + quantity, price: cleanPrice } 
            : p
        );
      }

      return [...prev, { ...item, price: cleanPrice, qty: quantity }];
    });
  };

  const removeItem = (id, size) => setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));

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
        promoCode,
        setPromoCode,
        discount,
        applyPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
