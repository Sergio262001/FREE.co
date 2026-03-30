import { useState } from "react";

function ItemCount({ stock, initial = 1, onAdd, onBuyNow }) {
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

      <div style={{ display: "flex", gap: "10px", width: "100%", flexDirection: "column" }}>
        <button
          className="count-add"
          onClick={() => onAdd(count)}
          disabled={stock === 0}
          style={{ width: "100%" }}
        >
          Agregar al carrito
        </button>
        {onBuyNow && (
          <button
            onClick={() => onBuyNow(count)}
            disabled={stock === 0}
            style={{ 
              width: "100%", 
              padding: "16px", 
              backgroundColor: "var(--text-primary)", 
              color: "var(--bg-primary)", 
              border: "none", 
              fontWeight: "600", 
              textTransform: "uppercase", 
              letterSpacing: "1px", 
              cursor: stock === 0 ? "not-allowed" : "pointer",
              fontSize: "12px"
            }}
          >
            Comprar Ahora
          </button>
        )}
      </div>

      {stock === 0 && (
        <p className="no-stock">Producto sin stock</p>
      )}
    </div>
  );
}

export default ItemCount;
