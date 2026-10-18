import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, variant }: { project: Project; variant?: "featured" }) {
  return (
    <article className={`project-card${variant === "featured" ? " project-card--featured" : ""}`}>
      {project.image && <img className="project-image" src={project.image} alt={`${project.name} preview`} />}
      <div className="card-topline">
        <span className="eyebrow">{project.kind}</span>
        <span className="card-date">{project.dates}</span>
      </div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <ul className="tag-list" aria-label={`${project.name} technologies`}>
        {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      {(project.githubUrl || project.liveUrl) && (
        <div className="card-links">
          {project.githubUrl && <a href={project.githubUrl}>GitHub <span aria-hidden="true">↗</span></a>}
          {project.liveUrl && <a href={project.liveUrl}>Live site <span aria-hidden="true">↗</span></a>}
        </div>
      )}
    </article>
  );
}
