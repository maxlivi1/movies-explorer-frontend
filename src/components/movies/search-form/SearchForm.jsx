import { useEffect } from "react";
import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({
  onSearch,
  searchPhrase = "",
  isShortsMovies = false,
}) {
  const [search, setSearch] = useState(searchPhrase);
  const [isShorts, setIsShorts] = useState(isShortsMovies);
  const [isVisibleError, setIsVisibleError] = useState(false);

  const errorStyle = isVisibleError
    ? "search-form__error search-form__error_visible"
    : "search-form__error";

  const searchFilm = (event) => {
    event.preventDefault();
    if (search.trim().length > 0) {
      onSearch({ search: search, shorts: isShorts });
      setIsVisibleError(false);
    } else {
      setIsVisibleError(true);
    }
  };

  const handleChangeCheckbox = (event) => {
    setIsShorts(event.target.checked);
    onSearch({ search: search, shorts: event.target.checked });
  };

  const handleChangeInput = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  useEffect(() => {
    if (isVisibleError && search.trim().length > 0) {
      setIsVisibleError(false);
    }
  }, [search]);

  return (
    <form className="search-form" onSubmit={searchFilm}>
      <div className="search-form__container">
        <span className={errorStyle}>Необходимо ввести запрос</span>
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          value={search}
          onChange={handleChangeInput}
        />
        <button type="submit" className="search-form__submit">
          Поиск
        </button>
      </div>
      <label className="search-form__checkbox-label">
        <input
          className="search-form__checkbox"
          type="checkbox"
          checked={isShorts}
          onChange={handleChangeCheckbox}
        />
        <span className="search-form__checkbox-span">
          {isShorts ? (
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
