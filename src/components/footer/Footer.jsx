import "./Footer.css";

export default function Footer() {
  return (
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
              noopener
              target={"_blank"}
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/MaxLiVi1"
              noopener
              target={"_blank"}
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
