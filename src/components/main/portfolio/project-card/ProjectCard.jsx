import "./ProjectCard.css";

export default function ProjectCard({ name, url }) {
  return (
    <li className="portfolio__project-card">
      <span className="portfolio__project-name">{name}</span>
      <a
        className="portfolio__project-link"
        href={url}
        noopener
        target="__blank"
      >↗</a>
    </li>
  );
}
