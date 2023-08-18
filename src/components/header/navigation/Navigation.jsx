import "./Navigation.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

export default function Navigation({ loggedIn }) {
  const style = loggedIn ? "navigation navigation_authorized" : "navigation";

  return (
    <nav className={style}>
      {loggedIn ? (
        <>
          <Link to={ROUTES.movies} className="navigation__link">
            Фильмы
          </Link>
          <Link to={ROUTES.savedMovies} className="navigation__link">
            Сохранённые Фильмы
          </Link>
        </>
      ) : (
        <>
          <Link
            to={ROUTES.registration}
            className="navigation__link-registration"
          >
            Регистрация
          </Link>
          <Link to={ROUTES.login} className="navigation__link-in">
            Войти
          </Link>
        </>
      )}
    </nav>
  );
}
