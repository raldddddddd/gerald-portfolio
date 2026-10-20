import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Projects — ${portfolio.name}`,
  description: `Browse all software, AI, and data projects by ${portfolio.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="container">
      <section className="section-block all-projects-page" aria-labelledby="all-projects-title">
        <div className="page-intro">
          <p className="eyebrow">Selected work & experiments</p>
          <h1 id="all-projects-title">All projects</h1>
          <p className="intro-copy">Software, AI, design, and data projects I’ve worked on.</p>
        </div>
        <p className="work-count all-projects-count">{String(portfolio.projects.length).padStart(2, "0")} projects</p>
        <div className="project-grid">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="featured" index={index} />
          ))}
        </div>
        <a className="all-projects-home-link" href="/#projects">← Back to selected projects</a>
      </section>
    </div>
  );
}
