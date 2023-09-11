import Subtitle from "../subtitle/Subtitle";
import "./AboutMe.css";
import avatar from "../../../images/main-avatar.jpg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <Subtitle text={"Студент"} />
      <div className="about-me__content">
        <div className="about-me__info">
          <p className="about-me__title">Максим</p>
          <p className="about-me__subtitle">Фронтенд-разработчик, 39 лет</p>
          <p className="about-me__description">
            Меня зовут Максим, я живу с семьей в замечательном городе Воронеже.
            Программирование меня заинтересовало еще в детстве, но видимо как-то
            не сложилось. Осознанные попытки осуществить свою мечту я предпринял
            еще в 2018 году, тогда-то я и написал свою первую строчку кода на
            языке java. И только в 2023 году, по окончании Яндекс Практикума,
            моя мечта начала обретать контур реальности. Сейчас я пишу
            пет-проекты, занимаюсь фрилансом и поиском своей первой работы в IT
            сфере.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/MaxLiVi1"
            target="__blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__wrapper">
          <img className="about-me__img" src={avatar} alt="Фото студента" />
        </div>
      </div>
    </section>
  );
}
