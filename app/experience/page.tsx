import { PageIntro } from "@/components/PageIntro";
import { portfolio } from "@/data/portfolio";

export default function ExperiencePage() {
  return (
    <div className="container page-container">
      <PageIntro eyebrow="Work history" title="Experience" description="A summary of my professional experience." />
      <div className="timeline">
        {portfolio.experience.map((item) => (
          <article className="experience-card" key={`${item.organization}-${item.role}`}>
            <div className="card-topline"><span className="eyebrow">{item.dates}</span><span className="card-date">{item.location}</span></div>
            <h2>{item.role}</h2><h3>{item.organization}</h3><p>{item.description}</p>
            <ul className="tag-list">{item.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </article>
        ))}
      </div>
    </div>
  );
}
