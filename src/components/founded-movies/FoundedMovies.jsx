import { useState } from "react";
import Movies from "../movies/Movies";

export default function FoundedMovies({
  movies,
  buttonType,
  savedCardsIdList,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const searchFilm = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
