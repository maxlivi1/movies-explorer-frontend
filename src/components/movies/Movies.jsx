import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Preloader from "../preloader/Preloader";
import MoviesCardList from "./movies-card-list/MoviesCardList";
import "./Movies.css";
import SearchForm from "./search-form/SearchForm";

export default function Movies({
  movies,
  isLoading,
  onSearch,
  onClick,
  isSaved,
  searchPhrase,
  isShortsMovies,
}) {
  const isEmptyList = !Boolean(movies.length);
  const pathname = useLocation().pathname;

  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        searchPhrase={searchPhrase}
        isShortsMovies={isShortsMovies}
      />
      {isLoading && <Preloader />}
      {!isLoading && !isEmptyList && (
        <>
          <MoviesCardList movies={movies} isSaved={isSaved} onClick={onClick} />
          {pathname === ROUTES.movies && isEmptyList && (
            <button type="button" className="movies__btn-more">
              Ещё
            </button>
          )}
        </>
      )}

      {!isLoading && isEmptyList && (
        <div className="movies__empty-container">
          {Boolean(searchPhrase.trim())
            ? "Фильмы по вашему запросу не найдены"
            : pathname === ROUTES.movies
            ? "Введите название фильма чтобы начать поиск"
            : "У вас пока нет сохранённых фильмов"}
        </div>
      )}
    </section>
  );
}
