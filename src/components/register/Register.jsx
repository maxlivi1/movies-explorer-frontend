import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../configs/appconfig";
import MainForm from "../main-form/MainForm";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import { useAppData } from "../../hooks/useAppData";

export default function Register() {
  const { loggedIn } = useAppContext();
  const { registration } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(ROUTES.main, { replace: true });
    }
  }, [loggedIn]);

  return <MainForm onSubmit={registration} />;
}
