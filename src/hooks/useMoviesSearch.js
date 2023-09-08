import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const useMoviesSearch = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isShorts, setIsShorts] = useState(false);
  const isSavedMovies = useLocation().pathname === ROUTES.savedMovies;

  const filterMovies = () => {
    const req = searchString.trim().toLowerCase();
    let list = [];

    if (isShorts) {
      if (isSavedMovies && req.length === 0) {
        list = moviesList.filter((i) => i.duration < 40);
      } else {
        list = moviesList
          .filter((i) => i.duration < 40)
          .filter(
            (i) =>
              i.nameRU.toLowerCase().includes(req) ||
              i.nameEN.toLowerCase().includes(req)
          );
      }
    } else {
      list = moviesList.filter(
        (i) =>
          i.nameRU.toLowerCase().includes(req) ||
          i.nameEN.toLowerCase().includes(req)
      );
    }
    setSearchedMovies(list);
  };

  useEffect(() => {
    if (!searchString.trim() && !isSavedMovies) {
      setSearchedMovies([]);
      return;
    }
    filterMovies();
  }, [searchString, isShorts, moviesList]);

  return {
    setMoviesList,
    setSearchString,
    setIsShorts,
    searchedMovies,
    setSearchedMovies,
    isShorts,
    searchString,
    filterMovies,
  };
};

export default useMoviesSearch;
