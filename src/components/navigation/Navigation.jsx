import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import AccountButton from "../header/account_button/AccountButton";

export default function Navigation({ loggedIn, isOpenMenu, onClose }) {
  const pathname = useLocation().pathname;
  let style = "navigation";

  const setStyle = () => {
    if (loggedIn && isOpenMenu) {
      style = "navigation navigation_place_mobile";
      return;
    }
    if (loggedIn) {
      style = "navigation navigation_authorized";
      return;
    }
  };
  setStyle();
  return (
    <nav className={style}>
      {loggedIn ? (
        <>
          {isOpenMenu && (
            <Link
              to={ROUTES.main}
              className={`navigation__link ${
                pathname === ROUTES.main ? "navigation__link__active" : ""
              }`}
              onClick={onClose}
            >
              Главная
            </Link>
          )}
          <Link
            to={ROUTES.movies}
            className={`navigation__link ${
              pathname === ROUTES.movies ? "navigation__link__active" : ""
            }`}
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            to={ROUTES.savedMovies}
            className={`navigation__link ${
              pathname === ROUTES.savedMovies ? "navigation__link__active" : ""
            }`}
            onClick={onClose}
          >
            Сохранённые фильмы
          </Link>
          {isOpenMenu && (
            <AccountButton
              loggedIn={loggedIn}
              isOpenMenu={isOpenMenu}
              onClose={onClose}
            />
          )}
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
