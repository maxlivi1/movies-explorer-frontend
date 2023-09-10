import { useEffect, useState } from "react";

const useSavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedIdList, setSavedIdList] = useState([]);

  const getIdList = (list) => {
    const idList = [];
    list.forEach((movie) => {
      idList.push(movie.movieId);
    });
    return idList;
  };

  const saveNewMovie = (movie) => {
    setSavedMovies((prev) => [movie, ...prev]);
  };

  const deleteMovie = (movie) => {
    let list = savedMovies.filter((i) => i.movieId !== movie.movieId);
    setSavedMovies(list);
  };

  const saveAllMovies = (movies) => {
    setSavedMovies(movies);
  };

  const isSaved = (id, idList) => {
    let b = false;
    idList.forEach((i) => {
      if (i === id) {
        b = true;
        return;
      }
    });
    return b;
  };

  const getSavedMovie = (id) => {
    let m = {};
    savedMovies.forEach((i) => {
      if (i.movieId === id) {
        m = i;
        return;
      }
    });
    return m;
  };

  useEffect(() => {
    setSavedIdList(getIdList(savedMovies));
  }, [savedMovies]);

  return {
    savedMovies,
    savedIdList,
    saveNewMovie,
    deleteMovie,
    saveAllMovies,
    isSaved,
    getSavedMovie,
  };
};

export default useSavedMovies;
