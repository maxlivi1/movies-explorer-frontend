import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Preloader from "../preloader/Preloader";
import MoviesCardList from "./movies-card-list/MoviesCardList";
import "./Movies.css";
import SearchForm from "./search-form/SearchForm";

export default function Movies({
  movies,
  filteredMovies,
  buttonType,
  savedCardsIdList,
  isLoading,
  onSearch,
}) {
  const isEmptyList = !Boolean(filteredMovies.length);
  const pathname = useLocation().pathname;

  return (
    <section className="movies">
      <SearchForm movies={movies} onSearch={onSearch} />
      {isLoading && <Preloader />}
      {!isLoading && !isEmptyList && (
        <>
          <MoviesCardList
            movies={filteredMovies}
            savedCardsIdList={savedCardsIdList}
            buttonType={buttonType}
          />
          {pathname === ROUTES.movies && filteredMovies.length !== 0 && (
            <button type="button" className="movies__btn-more">
              Ещё
            </button>
          )}
        </>
      )}

      {!isLoading && isEmptyList && (
        <div className="movies__empty-container">
          {pathname === ROUTES.movies
            ? "Введите название фильма чтобы начать поиск"
            : "У вас пока нет сохранённых фильмов"}
        </div>
      )}
    </section>
  );
}
