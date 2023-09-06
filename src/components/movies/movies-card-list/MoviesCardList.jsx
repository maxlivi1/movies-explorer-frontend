import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import MoviesCard from "../movies-card/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  onClick,
  isSaved,
}) {
  const isSavedMovies = useLocation().pathname === ROUTES.savedMovies;

  const checkSavedMovie = (id) => {
    if (isSavedMovies) return "saved";
    if (isSaved(id)) return "searchSaved";
  };

  return (
    <div className="movies-card-list">
      {movies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={isSavedMovies ? movie._id : movie.id}
            buttonType={checkSavedMovie(movie.id)}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}
