import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGE_TYPE, REG_EXP, ROUTES } from "../../utils/constants";
import "./Profile.css";
import { useAppContext } from "../../contexts/AppContext";
import { signout, updateUserInfo } from "../../utils/MainApi";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

export default function Profile({ setLoggedIn }) {
  const { currentUser, updateCurrentUser } = useAppContext();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const { showMessage } = useAppContext();

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

  const save = () => {
    setIsEditable(false);
    if (isWithoutChanges()) return;
    updateUserInfo({ name: name.trim(), email: email.trim() })
      .then((userData) => {
        updateCurrentUser({ name: userData.name, email: userData.email });
        showMessage({
          message: "Данные пользователя успешно обновлены",
          messageType: MESSAGE_TYPE.message,
        });
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

  const edit = () => {
    setIsEditable(true);
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
    setIsDisabled(true);
  };

  const cancel = () => {
    setIsEditable(false);
  };

  const logout = () => {
    signout()
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(false);
        window.localStorage.removeItem("search");
        navigate(ROUTES.main, { replace: true });
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
                value={name}
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
                type="text"
                name="email"
                value={email}
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
              <button className={submitStyle} type="button" onClick={save}>
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
