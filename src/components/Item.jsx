// Componente de una camisa individual
// Usamos props: props.title, props.img, props.price, props.category

export default function Item(props) {
    return (
      <div className="item-card">
        <img
          src={props.img}
          alt={props.title}
          className="item-image"
        />
  
        <h3 className="item-title">{props.title}</h3>
  
        <p className="item-category">{props.category}</p>
  
        <p className="item-price">${props.price}</p>
      </div>
    );
  }