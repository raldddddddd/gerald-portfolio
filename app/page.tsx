import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { portfolio } from "@/data/portfolio";

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow">{portfolio.headline}</p>
          <h1 id="home-title">Hi, I’m {portfolio.name.split(" ")[0]}.</h1>
          <p className="hero-copy">{portfolio.homeDescription}</p>
          <div className="button-row">
            <Link className="button button-primary" href="/software-development">Explore projects <span aria-hidden="true">→</span></Link>
            <Link className="button button-secondary" href="/contact">Get in touch</Link>
          </div>
        </div>
        <div className="hero-note"><span className="status-dot" /> Open to opportunities<br /><small>{portfolio.education.degree}</small></div>
      </section>
      <section className="section-block" aria-labelledby="featured-title">
        <div className="page-intro">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-title">A few things I’ve built</h2>
          <p className="intro-copy">Projects across software development, AI, and data science.</p>
        </div>
        <div className="project-grid">
          {portfolio.projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
      <section className="next-links" aria-label="Explore portfolio sections">
        <Link href="/ai-data-science"><span>01</span> AI & Data Science <b aria-hidden="true">↗</b></Link>
        <Link href="/experience"><span>02</span> Experience <b aria-hidden="true">↗</b></Link>
        <Link href="/about"><span>03</span> About <b aria-hidden="true">↗</b></Link>
      </section>
    </div>
  );
}
