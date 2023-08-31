import MoviesCard from "../movies-card/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, buttonType, savedCardsIdList }) {
  const checkSavedMovie = (id) => {
    if (buttonType === "saved") return buttonType;
    if(savedCardsIdList.includes(id)) {
      return "searchSaved"
    } else {
      return ""
    }
  }
  return (
    <div className="movies-card-list">
      {movies.map((movie) => {
        return (
          <MoviesCard movie={movie} key={movie.id} buttonType={checkSavedMovie(movie.id)} />
        );
      })}
    </div>
  );
}
