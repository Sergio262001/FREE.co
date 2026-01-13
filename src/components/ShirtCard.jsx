import { Link } from "react-router-dom";

function ShirtCard({ shirt }) {
  return (
    <article className="shirt-card">
      <img className="shirt-img" src={shirt.img} alt={shirt.title} />

      <div className="shirt-info">
        <h3 className="shirt-title">{shirt.title}</h3>
        <p className="shirt-price">${shirt.price}</p>
        <p className="shirt-category">{shirt.category}</p>

        <Link className="shirt-link" to={`/item/${shirt.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default ShirtCard;
