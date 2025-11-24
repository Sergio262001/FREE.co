import SeeMoreButton from "./SeeMoreButton";

function ShirtCard({ title, price, category, img }) {
  return (
    <article className="shirt-card">
      <img src={img} alt={title} className="shirt-image" />

      <h3 className="shirt-title">{title}</h3>
      <p className="shirt-category">{category}</p>
      <p className="shirt-price">${price}</p>

      <SeeMoreButton onClick={() => alert(`Detalles de: ${title}`)} />
    </article>
  );
}

export default ShirtCard;