import { useState } from "react";
import Movies from "../movies/Movies";
import { getBeatfilmMovies } from "../../utils/MoviesApi";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { deleteMovie, saveMovie } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE } from "../../utils/constants";

export default function FoundedMovies({ onSave, onDelete, isSaved, getMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const { searchedMovies, setMoviesList, setSearchString, setIsShorts } =
    useMoviesSearch();
  const { showMessage } = useAppContext();

  const searchFilms = ({ search, isShorts }) => {
    setIsLoading(true);
    getBeatfilmMovies()
      .then((moviesData) => {
        setMoviesList(moviesData);
        setIsShorts(isShorts);
        setSearchString(search);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const searchShortFilms = ({ search, isShorts }) => {
    setIsShorts(isShorts);
    setSearchString(search);
  };

  const saveFilm = (movie) => {
    saveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((newMovie) => {
        onSave(newMovie);
        showMessage({
          message: "Фильм успешно сохранён",
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

  const deleteFilm = (movie) => {
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

  const onClick = (movie) => {
    if (isSaved(movie.id)) {
      deleteFilm(getMovie(movie.id));
    } else {
      saveFilm(movie);
    }
  };

  return (
    <Movies
      movies={searchedMovies}
      isLoading={isLoading}
      onSearch={searchFilms}
      onSearchByTime={searchShortFilms}
      onClick={onClick}
      isSaved={isSaved}
    />
  );
}
