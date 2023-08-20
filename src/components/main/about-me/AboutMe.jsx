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
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
            музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
            фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
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
