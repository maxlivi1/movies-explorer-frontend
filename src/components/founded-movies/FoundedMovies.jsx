import { useState } from "react";
import Movies from "../movies/Movies";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { deleteMovie, saveMovie } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE } from "../../utils/constants";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import getFilteredMovies from "../../utils/getFilteredMovies";
import { useAppData } from "../../hooks/useAppData";

export default function FoundedMovies({ onSave, onDelete, isSaved, getMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getStorageValues, setStorageValues } = useLocalStorage();
  const {
    setMoviesList,
    searchedMovies,
    setSearchedMovies,
    setSearchString,
    setIsShorts,
  } = useMoviesSearch();
  const { showMessage, beatFilmMovies } = useAppContext();
  const { getBeatfilmMoviesData } = useAppData();

  const searchFilms = ({ search, shorts }) => {
    if (beatFilmMovies.length === 0) {
      getBeatfilmMoviesData(setIsLoading, setMoviesList);
    }
    setMoviesList(beatFilmMovies);
    setIsShorts(shorts);
    setSearchString(search);
    if (!search.trim()) {
      setStorageValues({
        shorts: shorts,
        search: search,
        movies: getFilteredMovies([], search, shorts),
      });
    } else {
      setStorageValues({
        shorts: shorts,
        search: search,
        movies: getFilteredMovies(beatFilmMovies, search, shorts),
      });
    }
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

  useEffect(() => {
    setSearchedMovies(getStorageValues().movies);
  }, []);

  return (
    <Movies
      movies={searchedMovies}
      isLoading={isLoading}
      onSearch={searchFilms}
      onClick={onClick}
      isSaved={isSaved}
      searchPhrase={getStorageValues().search}
      isShortsMovies={getStorageValues().shorts}
    />
  );
}
