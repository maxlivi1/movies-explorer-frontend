import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { MESSAGE_TYPE } from "../configs/appconfig";
import {
  deleteMovie,
  getSavedMovies,
  getUserInfo,
  login,
  register,
  saveMovie,
  signout,
  updateUserInfo,
} from "../utils/MainApi";
import { getBeatfilmMovies } from "../utils/MoviesApi";

const useAppData = () => {
  const { setLoggedIn, updateCurrentUser, showMessage, setBeatFilmMovies } =
    useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const registration = (name, email, password, setIsDisable) => {
    setIsDisable(true);
    register({ name: name, email: email, password: password })
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(true);
      })
      .catch((info) => info)
      .then((infoMessage) => {
        showMessage({
          message: infoMessage.message,
          messageType: MESSAGE_TYPE.error,
        });
      })
      .catch((error) => console.log(error))
      .finally(setIsDisable(false));
  };

  const loginIn = (email, password, setIsDisable) => {
    setIsDisable(true);
    login({ email: email, password: password })
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(true);
      })
      .catch((info) => info)
      .then((infoMessage) => {
        showMessage({
          message: infoMessage.message,
          messageType: MESSAGE_TYPE.error,
        });
      })
      .catch((error) => console.log(error))
      .finally(setIsDisable(false));
  };

  const updateUser = (name, email, isWithoutChanges, setIsEditable) => {
    if (isWithoutChanges()) return;
    updateUserInfo({ name: name.trim(), email: email.trim() })
      .then((userData) => {
        updateCurrentUser({ name: userData.name, email: userData.email });
        showMessage({
          message: "Данные пользователя успешно обновлены",
          messageType: MESSAGE_TYPE.message,
        });
        setIsEditable(false);
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

  const logout = () => {
    signout()
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(false);
        window.localStorage.removeItem("search");
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

  const getUserInfoData = () => {
    getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        updateCurrentUser(userData);
        navigate(location.pathname, { replace: true });
      })
      .catch((info) => info)
      .then((infoMessage) => console.log(infoMessage.message))
      .catch((error) => console.log(error));
  };

  const getSavedMoviesData = (saveAllMovies) => {
    getSavedMovies()
      .then((moviesData) => {
        saveAllMovies(moviesData);
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

  const getBeatfilmMoviesData = (setIsLoading, setMoviesList) => {
    setIsLoading(true);
    getBeatfilmMovies()
      .then((moviesData) => {
        setBeatFilmMovies(moviesData);
        setMoviesList(moviesData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const saveFilm = (movie, onSave, setIsDisable) => {
    setIsDisable(true);
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
      .catch((error) => console.log(error))
      .finally(() => setIsDisable(false));
  };

  const deleteFilm = (movie, onDelete, setIsDisable) => {
    setIsDisable(true);
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
      .catch((error) => console.log(error))
      .finally(() => setIsDisable(false));
  };

  return {
    registration,
    loginIn,
    logout,
    getUserInfoData,
    getSavedMoviesData,
    getBeatfilmMoviesData,
    saveFilm,
    deleteFilm,
    updateUser,
  };
};

export { useAppData };
