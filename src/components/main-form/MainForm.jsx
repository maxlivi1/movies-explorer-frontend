import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { REG_EXP, ROUTES } from "../../configs/appconfig";
import Logo from "../header/logo/Logo";
import "./MainForm.css";

export default function MainForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const isRegister = useLocation().pathname === ROUTES.registration;

  const { values, getError, handleChange, isValid } = useFormWithValidation();

  const inputStyle = !isDisable
    ? "main-form__form-input"
    : "main-form__form-input main-form__form-input_disabled";

  const getButtonStyle = useMemo(() => {
    let btnStyle = "main-form__register-button";
    if (!isRegister) {
      btnStyle = `${btnStyle} main-form__register-button_place_login`;
    }
    if (!isValid || isDisable) {
      btnStyle = `${btnStyle} main-form__register-button_disabled`;
    }
    return btnStyle;
  }, [isRegister, isValid, isDisable]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegister) {
      onSubmit(name, email, password, setIsDisable);
    } else {
      onSubmit(email, password, setIsDisable);
    }
  };

  const handleChangeInput = (event) => {
    const target = event.target;
    handleChange(event);
    setError(getError(target));
  };

  useEffect(() => {
    setName(values.name);
    setEmail(values.email);
    setPassword(values.password);
  }, [values]);

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
                className={inputStyle}
                disabled={isDisable}
                name="name"
                value={values.name}
                onChange={handleChangeInput}
                pattern={REG_EXP.name}
                required
                autoComplete="none"
              />
            </label>
          )}
          <label className="main-form__form-label">
            {"E-mail"}
            <input
              type="email"
              className={inputStyle}
              disabled={isDisable}
              autoComplete="none"
              name="email"
              value={values.email}
              onChange={handleChangeInput}
              pattern={REG_EXP.email}
              required
            />
          </label>
          <label className="main-form__form-label">
            {"Пароль"}
            <input
              type="password"
              className={inputStyle}
              disabled={isDisable}
              autoComplete="none"
              name="password"
              value={values.password}
              onChange={handleChangeInput}
              pattern={REG_EXP.password}
              required
            />
          </label>
          {isDisable && (
            <div className="main-form__form-container-overlay"></div>
          )}
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
