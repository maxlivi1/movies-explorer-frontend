import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MESSAGE_TYPE, ROUTES } from "../../utils/constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import NotFound from "../404/NotFound";
import "./App.css";
import MobileMenu from "../mobile-menu/MobileMenu";
import Profile from "../profile/Profile";
import Login from "../login/Login";
import Register from "../register/Register";
import SavedMovies from "../saved-movies/SavedMovies";
import FoundedMovies from "../founded-movies/FoundedMovies";
import InfoMessage from "../info-message/InfoMessage";
import { useAppContext } from "../../contexts/AppContext";

import { getSavedMovies, getUserInfo } from "../../utils/MainApi";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import useSavedMovies from "../../hooks/useSavedMovies";

export default function App() {
  const { loggedIn, setLoggedIn, currentUser, updateCurrentUser, showMessage } =
    useAppContext();
  const {
    savedMovies,
    getSavedMovie,
    saveNewMovie,
    deleteMovie,
    saveAllMovies,
    isSaved,
  } = useSavedMovies();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();

  const openMobileMenu = () => {
    setIsOpenMenu(true);
  };
  const closeMobileMenu = () => {
    setIsOpenMenu(false);
  };

  const saveFilm = (movie) => {
    saveNewMovie(movie);
  };

  const deleteFilm = (movie) => {
    deleteMovie(movie);
  };

  useEffect(() => {
    getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        updateCurrentUser(userData);
        navigate(ROUTES.movies, { replace: true });
      })
      .catch((info) => info)
      .then((infoMessage) => console.log(infoMessage.message))
      .catch((error) => console.log(error));
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
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
  }, [loggedIn]);

  return (
    <div className="app">
      <Header
        loggedIn={loggedIn}
        isOpenMenu={isOpenMenu}
        openMobileMenu={openMobileMenu}
      />
      <Routes>
        <Route path={ROUTES.main} element={<Main />} />
        <Route
          path={ROUTES.movies}
          element={
            <ProtectedRoute
              element={FoundedMovies}
              loggedIn={loggedIn}
              onSave={saveFilm}
              onDelete={deleteFilm}
              isSaved={isSaved}
              getMovie={getSavedMovie}
            />
          }
        ></Route>
        <Route
          path={ROUTES.savedMovies}
          element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
              movies={savedMovies}
              onDelete={deleteFilm}
            />
          }
        ></Route>
        <Route path={ROUTES.notFound} element={<NotFound />} />
        <Route
          path={ROUTES.profile}
          element={<Profile user={currentUser} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path={ROUTES.registration}
          element={<Register setLoggedIn={setLoggedIn} />}
        />
        <Route
          path={ROUTES.login}
          element={<Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
      <Footer />
      <MobileMenu
        loggedIn={loggedIn}
        isOpenMobileMenu={isOpenMenu}
        onClose={closeMobileMenu}
      />
      <InfoMessage />
    </div>
  );
}
