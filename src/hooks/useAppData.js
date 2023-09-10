import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { MESSAGE_TYPE } from "../utils/constants";
import { getSavedMovies, getUserInfo } from "../utils/MainApi";
import { getBeatfilmMovies } from "../utils/MoviesApi";

const useAppData = () => {
  const { setLoggedIn, updateCurrentUser, showMessage, setBeatFilmMovies } =
    useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

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

  return {
    getUserInfoData,
    getSavedMoviesData,
    getBeatfilmMoviesData,
  };
};

export { useAppData };
