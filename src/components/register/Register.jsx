import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import MainForm from "../main-form/MainForm";

export default function Register() {
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    navigate(ROUTES.login, { replace: true });
  };

  return <MainForm onSubmit={register} />;
}
