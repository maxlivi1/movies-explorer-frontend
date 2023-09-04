import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import NotFound from "../404/NotFound";
import "./App.css";
import MobileMenu from "../mobile-menu/MobileMenu";
import { moviesSavedList, user } from "../../utils/data";
import Profile from "../profile/Profile";
import Login from "../login/Login";
import Register from "../register/Register";
import SavedMovies from "../saved-movies/SavedMovies";
import FoundedMovies from "../founded-movies/FoundedMovies";
import InfoMessage from "../info-message/InfoMessage";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import { getUserInfo } from "../../utils/MainApi";
import ProtectedRoute from "../protected-route/ProtectedRoute";

export default function App() {
  const { loggedIn, setLoggedIn, updateCurrentUser, showMessage } =
    useAppContext();
  const getIdList = (list) => {
    const idList = [];
    list.forEach((movie) => {
      idList.push(movie.cardId);
    });
    return idList;
  };
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [savedCardsIdList, setSavedCardsIdList] = useState(
    getIdList(moviesSavedList)
  );
  const [savedMovies, setSavedMovies] = useState(moviesSavedList);
  const navigate = useNavigate();

  const openMobileMenu = () => {
    setIsOpenMenu(true);
  };
  const closeMobileMenu = () => {
    setIsOpenMenu(false);
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
              savedCardsIdList={savedCardsIdList}
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
            />
          }
        ></Route>
        <Route path={ROUTES.notFound} element={<NotFound />} />
        <Route
          path={ROUTES.profile}
          element={<Profile user={user} setLoggedIn={setLoggedIn} />}
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
