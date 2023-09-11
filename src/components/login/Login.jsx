import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { ROUTES } from "../../configs/appconfig";
import MainForm from "../main-form/MainForm";
import { useAppData } from "../../hooks/useAppData";

export default function Login() {
  const { loggedIn } = useAppContext();
  const { loginIn } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(ROUTES.movies, { replace: true });
    }
  }, [loggedIn]);

  return <MainForm onSubmit={loginIn} />;
}
