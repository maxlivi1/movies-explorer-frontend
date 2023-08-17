import Logo from "./logo/Logo";
import "./Header.css";
import AccountButton from "./account_button/AccountButton";
import Navigation from "./navigation/Navigation";

export default function Header({ loggedIn }) {
  return (
    <header className="header">
      <Logo />
      <Navigation loggedIn={loggedIn} />
      <AccountButton loggedIn={loggedIn} />
    </header>
  );
}
