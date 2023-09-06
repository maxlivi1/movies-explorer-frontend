import Movies from "../movies/Movies";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { useEffect } from "react";
import { deleteMovie } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE } from "../../utils/constants";

export default function SavedMovies({ movies, onDelete }) {
  const { searchedMovies, setMoviesList, setSearchString, setIsShorts } =
    useMoviesSearch();
  const { showMessage } = useAppContext();

  const searchFilms = ({ search, isShorts }) => {
    setIsShorts(isShorts);
    setSearchString(search);
  };

  const onClick = (movie) => {
    deleteMovie(movie._id)
      .then((deletedMovie) => {
        onDelete(deletedMovie);
        showMessage({
          message: "Фильм успешно удалён",
          messageType: MESSAGE_TYPE.message,
        });
      })
      .catch((info) => info)
      .then((infoMessage) => {
        showMessage({
          message: infoMessage.message,
          messageType: MESSAGE_TYPE.error,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  return (
    <Movies
      movies={searchedMovies}
      onSearch={searchFilms}
      onSearchByTime={searchFilms}
      onClick={onClick}
    />
  );
}
