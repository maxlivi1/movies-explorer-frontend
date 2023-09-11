import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../configs/appconfig";
import MoviesCard from "../movies-card/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, onClick, savedIdList }) {
  const isSavedMovies = useLocation().pathname === ROUTES.savedMovies;

  return (
    <div className="movies-card-list">
      {movies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            savedIdList={savedIdList}
            key={isSavedMovies ? movie._id : movie.id}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}
