import { useState } from "react";
import "./Profile.css";

export default function Profile({ user }) {
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const edit = () => {
    setIsEditable(true);
  };

  const save = () => {
    setIsEditable(false);
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
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          ) : (
            <span className="profile__value">{user.name}</span>
          )}
        </div>
        <div className="profile__info">
          <span className="profile__name">E-mail</span>
          {isEditable ? (
            <input
              className="profile__input"
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          ) : (
            <span className="profile__value">{user.email}</span>
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
