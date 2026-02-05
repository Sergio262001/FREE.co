import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount.jsx";
import { CartContext } from "../context/CartContext";
import "./itemDetail.css";


function ItemDetail({ item }) {
  const { addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <div className="detail-card">
      <img src={item.img} alt={item.title} />
      <div className="detail-info">
        <h2 className="detail-title">{item.title}</h2>
        <p className="detail-desc">{item.description}</p>
        <p className="detail-price">${item.price}</p>

        {!added ? (
          <ItemCount
            stock={item.stock}
            initial={1}
            onAdd={handleAdd}
          />
        ) : (
          <Link className="go-cart" to="/cart">
            Ir al carrito
          </Link>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
