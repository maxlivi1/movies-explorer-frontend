import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGE_TYPE, ROUTES } from "../../utils/constants";
import "./Profile.css";
import { useAppContext } from "../../contexts/AppContext";
import { signout, updateUserInfo } from "../../utils/MainApi";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useMemo } from "react";

export default function Profile({ setLoggedIn }) {
  const { currentUser, updateCurrentUser } = useAppContext();
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const { showMessage } = useAppContext();

  const navigate = useNavigate();
  const { values, handleChange, isValid, setValues } = useFormWithValidation();

  const getButtonStyle = useMemo(() => {
    let btnStyle = "profile__save-button";
    if (!isValid) {
      btnStyle = `${btnStyle} profile__save-button_disabled`;
    }
    return btnStyle;
  }, [isValid]);

  const profileInfoStyle = isEditable
    ? "profile__info profile__info_editable"
    : "profile__info";
  const profileNameStyle = isEditable
    ? "profile__name profile__name_editable"
    : "profile__name";

  const handleChangeInput = (event) => {
    handleChange(event);
    setError(event.target.validationMessage);
  };

  const isWithoutChanges = () => {
    if (
      currentUser.name !== values.name.trim() ||
      currentUser.email !== values.email.trim()
    ) {
      return false;
    }
    return true;
  };

  const save = () => {
    setIsEditable(false);
    if (isWithoutChanges()) return;
    updateUserInfo({ name: values.name.trim(), email: values.email.trim() })
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
  };

  const logout = () => {
    signout()
      .then((response) => {
        showMessage({
          message: response.message,
          messageType: MESSAGE_TYPE.message,
        });
        setLoggedIn(false);
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
                minLength={2}
                maxLength={30}
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
                onChange={handleChangeInput}
                required
                autoComplete="none"
              />
            ) : (
              <span className="profile__value">{currentUser.email}</span>
            )}
          </div>
        </form>

        <div className="profile__btn-container">
          {isEditable ? (
            <button className={getButtonStyle} type="button" onClick={save}>
              Сохранить
            </button>
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
