import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { MESSAGE_TYPE, ROUTES } from "../../configs/appconfig";
import { login } from "../../utils/MainApi";
import MainForm from "../main-form/MainForm";

export default function Login() {
  const { showMessage, loggedIn, setLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(ROUTES.main, { replace: true });
    }
  }, [loggedIn]);

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
