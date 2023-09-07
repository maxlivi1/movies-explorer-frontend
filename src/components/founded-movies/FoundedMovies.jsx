import { useState } from "react";
import Movies from "../movies/Movies";
import { getBeatfilmMovies } from "../../utils/MoviesApi";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { deleteMovie, saveMovie } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE } from "../../utils/constants";
import { useEffect } from "react";

export default function FoundedMovies({ onSave, onDelete, isSaved, getMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    searchedMovies,
    setMoviesList,
    setSearchString,
    searchString,
    setIsShorts,
    isShorts,
  } = useMoviesSearch();
  const { showMessage } = useAppContext();

  const getStorageValues = () => {
    const storage = window.localStorage;
    let searchData = {
      shorts: false,
      search: "",
      movies: [],
    };
    if (storage.getItem("search") === null) return searchData;
    try {
      const storageSearch = JSON.parse(storage.getItem("search"));
      console.log(storageSearch);
      if (storageSearch.movies.length !== 0) {
        searchData = storageSearch;
      }
    } catch (e) {
      storage.removeItem("search");
    }
    return searchData;
  };

  const setStorage = ({ shorts, search, movies }) => {
    const storage = window.localStorage;
    const storageData = {
      shorts: shorts,
      search: search,
      movies: movies,
    };
    storage.setItem("search", JSON.stringify(storageData));
  };

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

  useEffect(() => {
    setStorage({
      shorts: isShorts,
      search: searchString,
      movies: searchedMovies,
    });
  }, [searchString, isShorts, searchedMovies]);

  return (
    <Movies
      movies={searchedMovies}
      isLoading={isLoading}
      onSearch={searchFilms}
      onSearchByTime={searchShortFilms}
      onClick={onClick}
      isSaved={isSaved}
      searchPhrase={getStorageValues().search}
      isShortsMovies={getStorageValues().shorts}
    />
  );
}
