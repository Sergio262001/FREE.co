import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { totalUnits } = useContext(CartContext);

  return (
    <Link to="/cart" style={{ position: "relative" }}>
      🛒
      {totalUnits > 0 && (
        <span style={{ marginLeft: 6, fontWeight: "bold" }}>
          {totalUnits}
        </span>
      )}
    </Link>
  );
}
