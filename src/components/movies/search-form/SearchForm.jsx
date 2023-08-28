import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [search, setSearch] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isShortsFilmFilter, setIsShortsFilmFilter] = useState(false);

  const btnStyle = isDisable
    ? "search-form__submit search-form__submit_disable"
    : "search-form__submit";

  const searchFilm = async (event) => {
    event.preventDefault();
    if(!isValidInput) return;
    setIsDisable(true);
    await onSearch();
    setTimeout(() => {
      setIsDisable(false);
    }, 1500);
  };

  const handleChangeInput = (event) => {
    const v = event.target.value;
    setSearch(v);
    if (v.trim().length > 1) {
      setIsValidInput(true);
      setIsDisable(false);
    } else {
      setIsValidInput(false);
      setIsDisable(true);
    }
    console.log(v.length);
    console.log(isValidInput);
  };

  return (
    <form className="search-form" onSubmit={searchFilm}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          value={search}
          onChange={handleChangeInput}
        />
        <button type="submit" className={btnStyle}>
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
        <span className="search-form__checkbox-span">
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
