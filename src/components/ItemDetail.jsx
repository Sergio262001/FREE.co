import ItemCount from "./ItemCount.jsx";

function ItemDetail({ item }) {
  const handleAdd = (qty) => {
    // por ahora solo lo mostramos (luego se conecta al carrito)
    alert(`Agregaste ${qty} unidad(es) de: ${item.title}`);
  };

  return (
    <div className="detail-card">
      <img className="detail-img" src={item.img} alt={item.title} />

      <div className="detail-info">
        <h2 className="detail-title">{item.title}</h2>
        <p className="detail-desc">{item.description}</p>
        <p className="detail-price">${item.price}</p>

        <ItemCount stock={10} initial={1} onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default ItemDetail;
