import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { portfolio } from "@/data/portfolio";

export default function AiDataSciencePage() {
  const projects = portfolio.projects.filter((project) => project.category === "data");
  return <div className="container page-container"><PageIntro eyebrow="Selected work / 02" title="AI & Data Science" description="Machine learning, computer vision, and data-informed projects." /><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div>;
}
