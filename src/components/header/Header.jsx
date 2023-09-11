import Logo from "./logo/Logo";
import "./Header.css";
import AccountButton from "./account_button/AccountButton";
import Navigation from "../navigation/Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../configs/appconfig";
import BurgerMenu from "./burger-menu/BurgerMenu";

export default function Header({ loggedIn, openMobileMenu, isOpenMenu }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isVisible =
    pathname === ROUTES.main ||
    pathname === ROUTES.movies ||
    pathname === ROUTES.savedMovies ||
    pathname === ROUTES.profile;
  const style =
    pathname === ROUTES.main ? "header" : "header header_place_main";
  return (
    isVisible && (
      <header className={style}>
        <Logo />
        <Navigation loggedIn={loggedIn} />
        {!isOpenMenu && (
          <AccountButton loggedIn={loggedIn} isOpenMenu={isOpenMenu} />
        )}
        <BurgerMenu loggedIn={loggedIn} onClick={openMobileMenu} />
      </header>
    )
  );
}
