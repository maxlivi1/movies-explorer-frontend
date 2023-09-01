import { useState } from "react";
import Movies from "../movies/Movies";
import { searchMovies } from "../../utils/MoviesApi";

export default function FoundedMovies({ buttonType, savedCardsIdList }) {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFilms = (filteredList) => {
    setIsLoading(true);
    searchMovies()
      .then((moviesData) => {
        setMovies(moviesData);
        setSearchedMovies(filteredList);
      })
      .catch((err) => console.log(err)) // вывести ошибку для клиента
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Movies
      movies={movies}
      filteredMovies={searchedMovies}
      buttonType={buttonType}
      savedCardsIdList={savedCardsIdList}
      isLoading={isLoading}
      onSearch={searchFilms}
    />
  );
}
