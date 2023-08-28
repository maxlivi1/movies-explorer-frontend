import "./ProjectCard.css";

export default function ProjectCard({ name, url }) {
  return (
    <li className="project-card">
      <span className="project-card__name">{name}</span>
      <a
        className="project-card__link"
        href={url}
        target="__blank"
        rel="noreferrer"
      >
        ↗
      </a>
    </li>
  );
}
