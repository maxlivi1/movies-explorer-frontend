import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE, ROUTES } from "../../utils/constants";
import { login } from "../../utils/MainApi";
import MainForm from "../main-form/MainForm";

export default function Login({ setLoggedIn }) {
  const { showMessage } = useAppContext();
  const navigate = useNavigate();

  const loginIn = ({ email, password }) => {
    login({ email, password })
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

  return <MainForm onSubmit={loginIn} />;
}
