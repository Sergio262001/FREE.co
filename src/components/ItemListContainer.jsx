import ShirtCard from "./ShirtCard";

function ItemListContainer({ greeting, products }) {
  return (
    <section className="item-list-container">
      <div className="item-list-header">
        <h2>{greeting}</h2>
        <p>Elige una camisa para completar tu estilo.</p>
      </div>

      <div className="shirts-grid">
        {products.map((shirt) => (
          <ShirtCard
            key={shirt.id}
            title={shirt.title}
            price={shirt.price}
            category={shirt.category}
            img={shirt.img}
          />
        ))}
      </div>
    </section>
  );
}

export default ItemListContainer;