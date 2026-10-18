import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { portfolio } from "@/data/portfolio";

export default function SoftwareDevelopmentPage() {
  const projects = portfolio.projects.filter((project) => project.category === "software");
  return <div className="container page-container"><PageIntro eyebrow="Selected work / 01" title="Software Development" description="Applications and tools built for desktop and web." /><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div>;
}
