import { createContext, useContext, useState } from "react";
import { useInfoMessage } from "../hooks/useInfoMessage";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Максим", email: "max@mail.ru" });
  const { isOpen, open, close, text, type } = useInfoMessage();

  return (
    <AppContext.Provider
      value={{
        currentUser: user,
        updateCurrentUser: setUser,
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
