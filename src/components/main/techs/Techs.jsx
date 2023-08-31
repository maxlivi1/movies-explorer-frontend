import Subtitle from "../subtitle/Subtitle";
import "./Techs.css";
import { TECHNOLOGIES } from "../../../utils/constants";
import TechsCard from "./techs-card/TechsCard";

export default function Techs() {
  return (
    <section className="techs">
      <Subtitle text={"Технологии"} />
      <div className="techs__title">7 технологий</div>
      <div className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </div>
      <div className="techs__techs-container">
        {TECHNOLOGIES.map((item, index) => {
          return <TechsCard key={index} name={item.name} />;
        })}
      </div>
    </section>
  );
}
