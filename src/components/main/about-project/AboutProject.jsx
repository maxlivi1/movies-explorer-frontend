import Subtitle from "../subtitle/Subtitle";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <Subtitle text={"О проекте"} />
      <div className="about-project__stages">
        <div className="about-project__stage">
          <h3 className="about-project__stage-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__stage">
          <div className="about-project__stage">
            <h3 className="about-project__stage-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
