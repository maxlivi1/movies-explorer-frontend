import "./InfoMessage.css";
import { MESSAGE_TYPE } from "../../configs/appconfig";
import { useAppContext } from "../../contexts/AppContext";

export default function InfoMessage() {
  const { isOpenMessage, messageText, messageType } = useAppContext();

  let style = "info-message";

  if (messageType === MESSAGE_TYPE.error) {
    style = "info-message info-message_type_error";
  }

  const styleClass = `${style} ${isOpenMessage ? "info-message_visible" : ""}`;

  return <div className={styleClass}>{messageText}</div>;
}
