import { useState } from "react";
import Movies from "../movies/Movies";
import { moviesSearchList } from "../../utils/data";

export default function FoundedMovies({
  movies,
  buttonType,
  savedCardsIdList,
  setSearchMoviesList,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const searchFilm = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchMoviesList(moviesSearchList);
    }, 1500);
  };
  return (
    <Movies
      movies={movies}
      buttonType={buttonType}
      savedCardsIdList={savedCardsIdList}
      isLoading={isLoading}
      onSearch={searchFilm}
    />
  );
}
