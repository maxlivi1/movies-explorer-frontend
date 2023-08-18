import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import NotFound from "../404/NotFound";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="app">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path={ROUTES.main} element={<Main />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
