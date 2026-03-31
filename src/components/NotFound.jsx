import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound">
      <h2>404</h2>
      <p>Page not found</p>
      <Link className="notfound-link" to="/">
        Regresar al home
      </Link>
    </div>
  );
}

export default NotFound;
