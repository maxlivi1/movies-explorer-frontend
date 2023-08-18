import Logo from "./logo/Logo";
import "./Header.css";
import AccountButton from "./account_button/AccountButton";
import Navigation from "./navigation/Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export default function Header({ loggedIn }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isVisible =
    pathname === ROUTES.main ||
    pathname === ROUTES.movies ||
    pathname === ROUTES.savedMovies;
  const style =
    pathname === ROUTES.main ? "header" : "header header_place_main";
  return (
    isVisible && (
      <header className={style}>
        <Logo />
        <Navigation loggedIn={loggedIn} />
        <AccountButton loggedIn={loggedIn} />
      </header>
    )
  );
}
