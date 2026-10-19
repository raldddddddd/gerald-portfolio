"use client";

import type { Project } from "@/data/portfolio";
import { TechnologyBadges } from "@/components/TechnologyBadges";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";
import { useScrollReveal } from "@/components/useScrollReveal";

export function ProjectCard({ project, variant, index = 0 }: { project: Project; variant?: "featured"; index?: number }) {
  const reveal = useScrollReveal(index);
  const className = `project-card${variant === "featured" ? " project-card--featured" : ""}`;
  const externalUrl = project.liveUrl || project.githubUrl;
  const destination = project.liveUrl ? "website" : "GitHub repository";

  const content = (
    <>
      {project.images?.length ? (
        <ProjectImageCarousel
          images={project.images}
          imagesPerSlide={project.imagesPerSlide}
          intervalMs={project.imageIntervalMs}
          projectName={project.name}
          className={project.slug === "inbetween" ? "project-image-carousel--inbetween" : project.slug === "instaham" ? "project-image-carousel--instaham" : undefined}
        />
      ) : project.image && (
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
    </>
  );

  if (externalUrl) {
    return (
      <a className={`${className} ${reveal.className}`} ref={reveal.ref} style={reveal.style} href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${project.name} ${destination} in a new tab`}>
        {content}
      </a>
    );
  }

  return (
    <article className={`${className} ${reveal.className}`} ref={reveal.ref} style={reveal.style}>
      {content}
    </article>
  );
}
