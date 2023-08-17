import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation({ loggedIn }) {
  const style = loggedIn ? "navigation navigation_authorized" : "navigation";

  return (
    <nav className={style}>
      {loggedIn ? (
        <>
          <a className="navigation__link">Фильмы</a>
          <a className="navigation__link">Сохранённые Фильмы</a>
        </>
      ) : (
        <>
          <a className="navigation__link-registration">Регистрация</a>
          <a className="navigation__link-in">Войти</a>
        </>
      )}
    </nav>
  );
}
