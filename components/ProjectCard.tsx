import type { Project } from "@/data/portfolio";
import { TechnologyBadges } from "@/components/TechnologyBadges";

export function ProjectCard({ project, variant }: { project: Project; variant?: "featured" }) {
  const className = `project-card${variant === "featured" ? " project-card--featured" : ""}`;
  const isPopHopLink = project.slug === "pop-hop" && Boolean(project.liveUrl);

  const content = (
    <>
      {project.image && (
        <img
          className={`project-image${project.slug === "pop-hop" ? " project-image--pop-hop" : ""}`}
          src={project.image}
          alt={`${project.name} preview`}
        />
      )}
      <div className="card-topline">
        <span className="eyebrow">{project.kind}</span>
        <span className="card-date">{project.dates}</span>
      </div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <TechnologyBadges className="tag-list" technologies={project.technologies} />
      {!isPopHopLink && (project.githubUrl || project.liveUrl) && (
        <div className="card-links">
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site <span aria-hidden="true">↗</span></a>}
        </div>
      )}
    </>
  );

  if (isPopHopLink) {
    return (
      <a className={className} href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${project.name} website in a new tab`}>
        {content}
      </a>
    );
  }

  return (
    <article className={className}>
      {content}
    </article>
  );
}
