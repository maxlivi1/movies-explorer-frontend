import { createContext, useContext, useState } from "react";
import { useInfoMessage } from "../hooks/useInfoMessage";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [beatFilmMovies, setBeatFilmMovies] = useState([]);
  const { isOpen, open, close, text, type } = useInfoMessage();

  return (
    <AppContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        currentUser: user,
        updateCurrentUser: setUser,
        beatFilmMovies,
        setBeatFilmMovies,
        isOpenMessage: isOpen,
        showMessage: open,
        hideMessage: close,
        messageText: text,
        messageType: type,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
