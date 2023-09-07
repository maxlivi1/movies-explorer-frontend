import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import getFilteredMovies from "../utils/getFilteredMovies";

const useMoviesSearch = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isShorts, setIsShorts] = useState(false);
  const isSavedMovies = useLocation().pathname === ROUTES.savedMovies;

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

  useEffect(() => {
    if (!searchString.trim() && !isSavedMovies) {
      setSearchedMovies([]);
      return;
    }
    setSearchedMovies(getFilteredMovies(moviesList, searchString, isShorts));
  }, [searchString, isShorts, moviesList]);

  useEffect(() => {
    if (!isSavedMovies) {
      setIsShorts(getStorageValues().shorts);
      setMoviesList(getStorageValues().movies);
      setSearchString(getStorageValues().search);
    }
  }, []);

  return {
    setMoviesList,
    setSearchString,
    setIsShorts,
    searchedMovies,
    setSearchedMovies,
    isShorts,
    searchString,
  };
};

export default useMoviesSearch;
