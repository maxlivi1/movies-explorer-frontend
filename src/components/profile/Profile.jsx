import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import "./Profile.css";

export default function Profile({ user, setLoggedIn }) {
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();

  const { values, handleChangeValues } = useForm({
    name: name,
    email: email,
  });

  const edit = () => {
    setIsEditable(true);
  };

  const save = () => {
    setIsEditable(false);
    setName(values.name);
    setEmail(values.email);
  };

  const logout = () => {
    setLoggedIn(false);
    navigate(ROUTES.main, { replace: true });
  };

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
        <div className="profile__info">
          <span className="profile__name">Имя</span>
          {isEditable ? (
            <input
              className="profile__input"
              type="text"
              autoComplete="auto"
              name="name"
              value={values.name}
              minLength={2}
              maxLength={30}
              required
              onChange={handleChangeValues}
            />
          ) : (
            <span className="profile__value">{name}</span>
          )}
        </div>
        <div className="profile__info">
          <span className="profile__name">E-mail</span>
          {isEditable ? (
            <input
              className="profile__input"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChangeValues}
            />
          ) : (
            <span className="profile__value">{email}</span>
          )}
        </div>
        <div className="profile__btn-container">
          {isEditable ? (
            <button
              className="profile__save-button"
              type="button"
              onClick={save}
            >
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
