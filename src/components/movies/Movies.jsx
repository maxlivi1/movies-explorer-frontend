import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import MoviesCardList from "./movies-card-list/MoviesCardList";
import "./Movies.css";
import SearchForm from "./search-form/SearchForm";

export default function Movies({ movies, buttonType, savedCardsIdList }) {
  const isEmptyList = !Boolean(movies.length);
  const pathname = useLocation().pathname;
  return (
    <section className="movies">
      <SearchForm />
      {!isEmptyList && (
        <>
          <MoviesCardList
            movies={movies}
            savedCardsIdList={savedCardsIdList}
            buttonType={buttonType}
          />
          {pathname === ROUTES.movies && (
            <button type="button" className="movies__btn-more">
              Ещё
            </button>
          )}
        </>
      )}
      {isEmptyList && (
        <div className="movies__empty-container">
          {pathname === ROUTES.movies
            ? "Введите название фильма чтобы начать поиск"
            : "У вас пока нет сохранённых фильмов"}
        </div>
      )}
    </section>
  );
}
