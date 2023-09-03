import { useMemo } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { ROUTES } from "../../utils/constants";
import Logo from "../header/logo/Logo";
import "./MainForm.css";

export default function MainForm({ onSubmit }) {
  const [error, setError] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const isRegister = useLocation().pathname === ROUTES.registration;

  const { values, handleChange, isValid } = useFormWithValidation();

  const getButtonStyle = useMemo(() => {
    let btnStyle = "main-form__register-button";
    if (!isRegister) {
      btnStyle = `${btnStyle} main-form__register-button_place_login`;
    }
    if (isDisable || !isValid) {
      btnStyle = `${btnStyle} main-form__register-button_disabled`;
    }
    return btnStyle;
  }, [isDisable, isRegister, isValid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisable(true);
    if (isRegister) {
      await onSubmit({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } else {
      await onSubmit({
        email: values.email,
        password: values.password,
      });
    }
    setIsDisable(false);
  };

  const handleChangeInput = (event) => {
    handleChange(event);
    setError(event.target.validationMessage);
  };

  return (
    <section className="main-form">
      <form
        className="main-form__form"
        name="main-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Logo />
        <h1 className="main-form__title">
          {isRegister ? "Добро пожаловать!" : "Рады видеть!"}
        </h1>
        <fieldset data-error={error} className="main-form__form-container">
          {isRegister && (
            <label className="main-form__form-label">
              {"Имя"}
              <input
                id="input-name"
                type="text"
                className="main-form__form-input"
                name="name"
                value={values.name}
                onChange={handleChangeInput}
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
              onChange={handleChangeInput}
              required
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
              onChange={handleChangeInput}
              minLength={5}
              maxLength={50}
              required
            />
          </label>
        </fieldset>
        <button className={getButtonStyle} type="submit">
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
