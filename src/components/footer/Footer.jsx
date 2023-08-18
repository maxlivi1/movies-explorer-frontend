import "./Footer.css";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export default function Footer() {
  const location = useLocation();
  const pathname = location.pathname;
  const isVisible =
    pathname === ROUTES.main ||
    pathname === ROUTES.movies ||
    pathname === ROUTES.savedMovies;
  return (
    isVisible && (
      <footer className="footer">
        <div className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </div>
        <div className="footer__content">
          <span className="footer__copyrighting">© 2023</span>
          <ul className="footer__links">
            <li>
              <a
                className="footer__link"
                href="https://practicum.yandex.ru/"
                target={"_blank"}
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://github.com/MaxLiVi1"
                target={"_blank"}
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}
