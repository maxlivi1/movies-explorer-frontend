import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <a className="not-found__home" href="#">Назад</a>
    </div>
  )
}
