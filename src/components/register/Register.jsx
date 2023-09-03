import { useNavigate } from "react-router-dom";
import { MESSAGE_TYPE, ROUTES } from "../../utils/constants";
import MainForm from "../main-form/MainForm";
import { register } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";

export default function Register({ setLoggedIn }) {
  const { showMessage } = useAppContext();
  const navigate = useNavigate();

  const registration = ({ name, email, password }) => {
    register({ name, email, password })
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(true);
        navigate(ROUTES.movies, { replace: true });
      })
      .catch((info) => info)
      .then((infoMessage) => {
        showMessage({
          message: infoMessage.message,
          messageType: MESSAGE_TYPE.error,
        });
      })
      .catch((error) => console.log(error));
  };

  return <MainForm onSubmit={registration} />;
}
