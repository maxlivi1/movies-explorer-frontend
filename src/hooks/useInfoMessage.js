import { useState } from "react";

const useInfoMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const close = () => setIsOpen(false);

  const open = ({ message, messageType }) => {
    setText(message);
    setType(messageType);
    setIsOpen(true);
    setTimeout(() => {
      close();
      setTimeout(() => {
        setText("");
      }, 5000);
    }, 5000);
  };

  return {
    isOpen,
    open,
    text,
    type,
  };
};

export { useInfoMessage };
