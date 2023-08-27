import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import NotFound from "../404/NotFound";
import "./App.css";
import MobileMenu from "../mobileMenu/MobileMenu";
import Movies from "../movies/Movies";
import {
  moviesSearchList,
  moviesEmptyList,
  moviesSavedList,
  user,
} from "../../utils/data";
import Profile from "../profile/Profile";
import Login from "../login/Login";
import Register from "../register/Register";

export default function App() {
  const getIdList = (list) => {
    const idList = [];
    list.forEach((movie) => {
      idList.push(movie.cardId);
    });
    return idList;
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [savedCardsIdList, setSavedCardsIdList] = useState(
    getIdList(moviesSavedList)
  );
  const moviesList = moviesEmptyList;
  const moviesSaved = moviesEmptyList;

  const openMobileMenu = () => {
    setIsOpenMenu(true);
  };
  const closeMobileMenu = () => {
    setIsOpenMenu(false);
  };

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
            <Movies movies={moviesList} savedCardsIdList={savedCardsIdList} />
          }
        ></Route>
        <Route
          path={ROUTES.savedMovies}
          element={<Movies movies={moviesSaved} buttonType={"saved"} />}
        ></Route>
        <Route path={ROUTES.notFound} element={<NotFound />} />
        <Route
          path={ROUTES.profile}
          element={<Profile user={user} setLoggedIn={setLoggedIn} />}
        />
        <Route path={ROUTES.registration} element={<Register />} />
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
    </div>
  );
}
