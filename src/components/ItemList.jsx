import ShirtCard from "./ShirtCard.jsx";

function ItemList({ products }) {
  return (
    <div className="shirts-grid">
      {products.map((shirt) => (
        <ShirtCard key={shirt.id} shirt={shirt} />
      ))}
    </div>
  );
}

export default ItemList;
