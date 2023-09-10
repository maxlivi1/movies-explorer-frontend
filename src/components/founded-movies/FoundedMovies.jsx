import { useState } from "react";
import Movies from "../movies/Movies";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { deleteMovie, saveMovie } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE } from "../../utils/constants";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppData } from "../../hooks/useAppData";
import useResize from "../../hooks/useResize";
import useSavedMovies from "../../hooks/useSavedMovies";

export default function FoundedMovies({
  onSave,
  onDelete,
  savedIdList,
  getMovie,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isButtonMoreVisible, setIsButtonMoreVisible] = useState(false);
  const { getStorageValues, setStorageValues } = useLocalStorage();
  const {
    isShorts,
    searchString,
    setMoviesList,
    searchedMovies,
    setSearchedMovies,
    setSearchString,
    setIsShorts,
  } = useMoviesSearch();
  const { isSaved } = useSavedMovies();
  const { showMessage, beatFilmMovies } = useAppContext();
  const { getBeatfilmMoviesData } = useAppData();
  const { count, elseCount } = useResize();

  const searchFilms = ({ search, shorts }) => {
    if (beatFilmMovies.length === 0) {
      getBeatfilmMoviesData(setIsLoading, setMoviesList);
    }
    setMoviesList(beatFilmMovies);
    setIsShorts(shorts);
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

  const onClick = (movie, idList) => {
    if (isSaved(movie.id, idList)) {
      deleteFilm(getMovie(movie.id));
    } else {
      saveFilm(movie);
    }
  };

  const showMoreMovies = () => {
    setFilteredList(searchedMovies.slice(0, filteredList.length + elseCount));
  };

  useEffect(() => {
    const { movies } = getStorageValues();
    setSearchedMovies(movies);
    setFilteredList(movies.slice(0, count));
  }, []);

  useEffect(() => {
    setFilteredList(searchedMovies.slice(0, count));
  }, [count, searchedMovies]);

  useEffect(() => {
    if (
      searchedMovies.length === filteredList.length ||
      searchedMovies.length <= count
    ) {
      setIsButtonMoreVisible(false);
    } else {
      setIsButtonMoreVisible(true);
    }
  }, [filteredList, searchedMovies, count]);

  useEffect(() => {
    if (!searchString.trim()) return;

    setStorageValues({
      shorts: isShorts,
      search: searchString,
      movies: searchedMovies,
    });
  }, [searchedMovies, searchString, isShorts]);

  return (
    <Movies
      movies={filteredList}
      isLoading={isLoading}
      onSearch={searchFilms}
      onClick={onClick}
      savedIdList={savedIdList}
      isMoreVisible={isButtonMoreVisible}
      showMore={showMoreMovies}
      searchPhrase={getStorageValues().search}
      isShortsMovies={getStorageValues().shorts}
    />
  );
}
