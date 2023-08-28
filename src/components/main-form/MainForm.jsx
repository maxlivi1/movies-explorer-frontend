import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ROUTES } from "../../utils/constants";
import Logo from "../header/logo/Logo";
import "./MainForm.css";

export default function MainForm({ onSubmit }) {
  const isRegister = useLocation().pathname === ROUTES.registration;

  const btnStyle = isRegister
    ? "main-form__register-button"
    : "main-form__register-button main-form__register-button_place_login";

  const { values, handleChangeValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  return (
    <section className="main-form">
      <form className="main-form__form" name="main-form" onSubmit={onSubmit}>
        <Logo />
        <h1 className="main-form__title">
          {isRegister ? "Добро пожаловать!" : "Рады видеть!"}
        </h1>
        <fieldset className="main-form__form-container">
          {isRegister && (
            <label className="main-form__form-label">
              {"Имя"}
              <input
                id="input-name"
                type="text"
                className="main-form__form-input"
                name="name"
                value={values.name}
                onChange={handleChangeValues}
                minLength={2}
                maxLength={30}
                required
              />
            </label>
          )}
          <label className="main-form__form-label">
            {"E-mail"}
            <input
              type="email"
              className="main-form__form-input"
              autoComplete="new-email"
              name="email"
              value={values.email}
              onChange={handleChangeValues}
            />
          </label>
          <label className="main-form__form-label">
            {"Пароль"}
            <input
              type="password"
              className="main-form__form-input"
              autoComplete="new-password"
              name="password"
              value={values.password}
              onChange={handleChangeValues}
              required
            />
          </label>
        </fieldset>
        <button className={btnStyle} type="submit">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <div className="main-form__link-container">
          <span className="main-form__link-info">
            {isRegister ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
          </span>
          {isRegister ? (
            <Link to={ROUTES.login} className="main-form__link">
              Войти
            </Link>
          ) : (
            <Link to={ROUTES.registration} className="main-form__link">
              Регистрация
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}
