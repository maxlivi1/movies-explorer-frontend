import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import NotFound from "../404/NotFound";
import "./App.css";
import MobileMenu from "../mobileMenu/MobileMenu";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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
        <Route path={ROUTES.notFound} element={<NotFound />} />
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
