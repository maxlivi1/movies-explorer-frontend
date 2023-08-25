import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm() {
  const [isShortsFilmFilter, setIsShortsFilmFilter] = useState(false);
  return (
    <form action="#" className="search-form">
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Введите название фильма"
        />
        <button type="submit" className="search-form__submit">
          Поиск
        </button>
      </div>
      <label className="search-form__checkbox-label">
        <input
          className="search-form__checkbox"
          type="checkbox"
          onChange={(event) => {
            setIsShortsFilmFilter(event.target.checked);
          }}
        />
        <span
          className="search-form__checkbox-span"
        >
          {isShortsFilmFilter ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="20"
              fill="none"
            >
              <rect width="36" height="20" fill="#2BE080" rx="10" />
              <circle cx="26" cy="10" r="4" fill="#fff" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="20"
              fill="none"
            >
              <rect width="36" height="20" fill="#EBEBEB" rx="10" />
              <circle cx="10" cy="10" r="4" fill="#F5F5F5" />
            </svg>
          )}
        </span>
        Короткометражки
      </label>
    </form>
  );
}
