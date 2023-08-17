import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      <Header loggedIn={loggedIn} />
      <Main />
      <Footer />
    </div>
  );
}
