import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REG_EXP, ROUTES } from "../../configs/appconfig";
import "./Profile.css";
import { useAppContext } from "../../contexts/AppContext";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";
import { useAppData } from "../../hooks/useAppData";

export default function Profile() {
  const { currentUser, loggedIn } = useAppContext();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const { updateUser, logout } = useAppData();

  const navigate = useNavigate();
  const { values, getError, handleChange, isValid, setValues } =
    useFormWithValidation();

  const submitStyle = isDisabled
    ? "profile__save-button profile__save-button_disabled"
    : "profile__save-button";

  const profileInfoStyle = isEditable
    ? "profile__info profile__info_editable"
    : "profile__info";
  const profileNameStyle = isEditable
    ? "profile__name profile__name_editable"
    : "profile__name";

  const isWithoutChanges = () => {
    if (
      currentUser.name !== name.trim() ||
      currentUser.email !== email.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleChangeInput = (event) => {
    const target = event.target;
    handleChange(event);
    setError(getError(target));
  };

  const saveUserInfo = () => {
    updateUser(name, email, isWithoutChanges, setIsEditable);
  };

  const edit = () => {
    setIsEditable(true);
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
    setIsDisabled(true);
  };

  const cancel = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    setName(values.name);
    setEmail(values.email);
  }, [values]);

  useEffect(() => {
    if (isValid && !isWithoutChanges()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, isValid]);

  useEffect(() => {
    if (!loggedIn) {
      navigate(ROUTES.main, { replace: true });
    }
  }, [loggedIn]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__info-container" data-error={error}>
          <div className={profileInfoStyle}>
            <span className={profileNameStyle}>Имя</span>
            {isEditable ? (
              <input
                className="profile__input"
                type="text"
                autoComplete="none"
                name="name"
                value={values.name}
                pattern={REG_EXP.name}
                required
                onChange={handleChangeInput}
              />
            ) : (
              <span className="profile__value">{currentUser.name}</span>
            )}
          </div>
          <div className={profileInfoStyle}>
            <span className={profileNameStyle}>E-mail</span>
            {isEditable ? (
              <input
                className="profile__input"
                type="email"
                name="email"
                value={values.email}
                pattern={REG_EXP.email}
                required
                onChange={handleChangeInput}
                autoComplete="none"
              />
            ) : (
              <span className="profile__value">{currentUser.email}</span>
            )}
          </div>
        </form>

        <div className="profile__btn-container">
          {isEditable ? (
            <>
              <button
                className={submitStyle}
                type="button"
                onClick={saveUserInfo}
              >
                Сохранить
              </button>
              <button
                className="profile__save-button profile__save-button_type_cancel"
                type="button"
                onClick={cancel}
              >
                Отменить
              </button>
            </>
          ) : (
            <>
              <button className="profile__btn" type="button" onClick={edit}>
                Редактировать
              </button>
              <button
                className="profile__btn profile__btn_type_exit"
                type="button"
                onClick={logout}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
