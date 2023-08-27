import { useState } from "react";
import Movies from "../movies/Movies";

export default function SavedMovies({ movies, savedCardsIdList }) {
  const [isLoading, setIsLoading] = useState(false);

  const searchFilm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  return (
    <Movies
      movies={movies}
      buttonType={"saved"}
      savedCardsIdList={savedCardsIdList}
      isLoading={isLoading}
      onSearch={searchFilm}
    />
  );
}
