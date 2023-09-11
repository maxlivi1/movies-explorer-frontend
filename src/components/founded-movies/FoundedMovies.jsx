import { useState } from "react";
import Movies from "../movies/Movies";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { useAppContext } from "../../contexts/AppContext";
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
  const { beatFilmMovies } = useAppContext();
  const { getBeatfilmMoviesData, saveFilm, deleteFilm } = useAppData();
  const { count, elseCount } = useResize();

  const searchFilms = ({ search, shorts }) => {
    if (beatFilmMovies.length === 0) {
      getBeatfilmMoviesData(setIsLoading, setMoviesList);
    }
    setMoviesList(beatFilmMovies);
    setIsShorts(shorts);
    setSearchString(search);
  };

  const onClick = (movie, idList, setIsDisable) => {
    if (isSaved(movie.id, idList)) {
      deleteFilm(getMovie(movie.id), onDelete, setIsDisable);
    } else {
      saveFilm(movie, onSave, setIsDisable);
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
