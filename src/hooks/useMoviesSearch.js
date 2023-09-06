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

  useEffect(() => {
    if (!searchString.trim() && !isSavedMovies) {
      setSearchedMovies([]);
      return;
    }
    setSearchedMovies(getFilteredMovies(moviesList, searchString, isShorts));
  }, [searchString, isShorts, moviesList]);

  return {
    setMoviesList,
    setSearchString,
    setIsShorts,
    searchedMovies,
  };
};

export default useMoviesSearch;
