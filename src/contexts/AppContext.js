import { createContext, useContext } from "react";
import { useInfoMessage } from "../hooks/useInfoMessage";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const { isOpen, open, close, text, type } = useInfoMessage();

  return (
    <AppContext.Provider
      value={{
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
