import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({ movie, buttonType, onClick }) {
  const pathname = useLocation().pathname;
  const [btnType, setBtnType] = useState(buttonType);

  let filmTime = "";
  const time = Number(movie.duration);
  if (time < 60) {
    filmTime = `${time}мин`;
  } else {
    filmTime = `${Math.floor(time / 60)}ч ${time % 60}мин`;
  }

  const imageUrl =
    pathname === ROUTES.savedMovies
      ? movie.image
      : `https://api.nomoreparties.co${movie.image.url}`;

  const changeBtnType = () => {
    onClick(movie);
    if (btnType === "searchSaved") return setBtnType("");
    if (!btnType) return setBtnType("searchSaved");
  };

  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <p className="movies-card__name" title={movie.nameRU}>
          {movie.nameRU}
        </p>
        <span className="movies-card__time">{filmTime}</span>
      </div>
      <Link to={movie.trailerLink} target={"_blank"}>
        <img
          className="movies-card__photo"
          src={imageUrl}
          alt={`Картинка к фильму ${movie.nameRU}`}
        />
      </Link>
      <button
        type="button"
        className="movies-card__btn"
        onClick={changeBtnType}
      >
        {!btnType && "Сохранить"}
        {btnType === "saved" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="29"
            fill="none"
          >
            <rect width="100" height="29" fill="#313131" rx="14.5" />
            <path
              fill="#fff"
              fillRule="evenodd"
              d="m51.06 14.382 2.24-2.24-1.06-1.06-2.24 2.24-2.239-2.24-1.06 1.061 2.239 2.24-2.357 2.356 1.06 1.06L50 15.444l2.357 2.357 1.06-1.06-2.356-2.358Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {btnType === "searchSaved" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="29"
            fill="none"
          >
            <rect width="100" height="29" fill="#EE3465" rx="14.5" />
            <path
              stroke="#fff"
              strokeWidth="1.5"
              d="M46 14.75 48.819 17 54 12.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
