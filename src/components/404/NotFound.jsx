import { Link } from "react-router-dom";
import "./NotFound.css";
import { ROUTES } from "../../utils/constants";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link to={ROUTES.main} className="not-found__home">Назад</Link>
    </div>
  )
}
