import Movies from "../movies/Movies";
import useMoviesSearch from "../../hooks/useMoviesSearch";
import { useEffect } from "react";
import { useAppData } from "../../hooks/useAppData";

export default function SavedMovies({ movies, onDelete }) {
  const {
    searchedMovies,
    setMoviesList,
    searchString,
    setSearchString,
    setIsShorts,
  } = useMoviesSearch();

  const { deleteFilm } = useAppData();

  const searchFilms = ({ search, shorts }) => {
    setIsShorts(shorts);
    setSearchString(search);
  };

  const deleteMovie = (movie, setIsDisable) => {
    deleteFilm(movie, onDelete, setIsDisable);
  };

  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  return (
    <Movies
      movies={searchedMovies}
      onSearch={searchFilms}
      onClick={deleteMovie}
      searchPhrase={searchString}
    />
  );
}
