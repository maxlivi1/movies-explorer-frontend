import { useNavigate } from "react-router-dom";
import { MESSAGE_TYPE, ROUTES } from "../../configs/appconfig";
import MainForm from "../main-form/MainForm";
import { register } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";

export default function Register() {
  const { showMessage, loggedIn, setLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(ROUTES.main, { replace: true });
    }
  }, [loggedIn]);

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
