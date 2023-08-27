import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import MainForm from "../main-form/MainForm";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setLoggedIn(true);
    navigate(ROUTES.savedMovies, { replace: true });
  };

  return <MainForm onSubmit={login} />;
}
