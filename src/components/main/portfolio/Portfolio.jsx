import "./Portfolio.css";
import { PROJECTS_LIST } from "../../../utils/constants";
import ProjectCard from "./project-card/ProjectCard";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        {PROJECTS_LIST.map((project, index) => {
          return (
            <ProjectCard name={project.name} url={project.url} key={index} />
          );
        })}
      </ul>
    </section>
  );
}
