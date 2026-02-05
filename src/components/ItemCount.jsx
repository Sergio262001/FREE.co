import { useState } from "react";

function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  return (
    <div className="count">
      <div className="count-controls">
        <button onClick={dec} disabled={count <= 1}>
          -
        </button>

        <span className="count-number">{count}</span>

        <button onClick={inc} disabled={count >= stock}>
          +
        </button>
      </div>

      <button
        className="count-add"
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>

      {stock === 0 && (
        <p className="no-stock">Producto sin stock</p>
      )}
    </div>
  );
}

export default ItemCount;
