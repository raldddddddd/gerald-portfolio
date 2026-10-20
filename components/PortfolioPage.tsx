import Image from "next/image";
import { ContactDetails } from "@/components/ContactDetails";
import { CatTreeHero } from "@/components/CatTreeHero";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EmailActions } from "@/components/EmailActions";
import { IsometricHeroCatTree, IsometricHeroWindow } from "@/components/IsometricHeroArt";
import { ProjectConsoleHero } from "@/components/ProjectConsoleHero";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillIcon } from "@/components/SkillIcon";
import { SkillsReveal } from "@/components/SkillsReveal";
import { portfolio } from "@/data/portfolio";

function SkillGrid({ skills }: { skills: string[] }) {
  return (
    <SkillsReveal>
      <ul className="home-skill-grid">
        {skills.map((skill, index) => (
          <li className="home-skill" key={skill} style={{ "--skill-index": index } as React.CSSProperties}>
            <span className="home-skill-icon"><SkillIcon name={skill} /></span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </SkillsReveal>
  );
}

export function PortfolioPage({ heroVariant = "default" }: { heroVariant?: "default" | "cats" }) {
  const firstName = portfolio.name.split(" ")[0];
  const featuredProjects = portfolio.projects.filter((project) => ["inbetween", "instaham"].includes(project.slug));
  const skills = Object.values(portfolio.skills).flat();

  return (
    <div className="container">
      <section className={`home-hero${heroVariant === "default" ? " home-hero-full" : ""}`} id="home" aria-labelledby="home-title">
        {heroVariant === "default" && <IsometricHeroWindow />}
        <div className="home-hero-copy">
          <p className="eyebrow">{heroVariant === "default" ? "Software Development · Full-Stack Engineering & AI/ML" : portfolio.headline}</p>
          <h1 className="hero-title" id="home-title">Hi, I’m <span>{firstName}.</span></h1>
          <p className="hero-copy">{portfolio.homeDescription}</p>
          <div className="button-row">
            {heroVariant === "default" && (
              <a className="button button-primary button-with-icon" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <svg className="resume-button-icon" viewBox="0 0 16 18" fill="none" aria-hidden="true" focusable="false">
                  <path d="M3 1.5h6l4 4v11H3zM9 1.5v4h4M5.5 9h5M5.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>View Resume</span>
              </a>
            )}
            <a className="button button-secondary" href="#contact">Get in touch</a>
          </div>
          {heroVariant === "cats" && <div className="hero-note"><span className="status-dot" /> Open to opportunities<br /><small>{portfolio.education.degree}</small></div>}
        </div>
        {heroVariant === "default" && <IsometricHeroCatTree />}
        {heroVariant === "cats" && <CatTreeHero />}
      </section>

      <section className="section-block home-about" id="about" aria-labelledby="about-title">
        <div className="home-about-overview">
          <div className="page-intro">
            <p className="eyebrow">A little about me</p>
            <h2 id="about-title">About</h2>
            <p className="intro-copy">{portfolio.intro}</p>
          </div>
          <section className="content-panel" aria-labelledby="education-heading">
            <p className="eyebrow">Education</p><h2 id="education-heading">{portfolio.education.school}</h2>
            <p>{portfolio.education.degree}</p><p className="muted">{portfolio.education.location} · {portfolio.education.dates}</p>
            <p>{portfolio.education.distinction} · GWA {portfolio.education.gwa}</p>
            <h3>Relevant coursework</h3><ul className="tag-list">{portfolio.education.coursework.map((course) => <li key={course}>{course}</li>)}</ul>
          </section>
        </div>
      </section>

      <section className="section-block experience-section" aria-labelledby="experience-title">
        <div className="page-intro">
          <p className="eyebrow">Work history</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <div className="timeline">
          {portfolio.experience.map((item, index) => (
            <ExperienceCard key={`${item.organization}-${item.role}`} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="section-block home-skills" aria-labelledby="skills-title">
        <div className="page-intro">
          <p className="eyebrow">My toolkit</p>
          <h2 id="skills-title">Skills & technologies</h2>
          <p className="intro-copy">Languages, data science libraries, frameworks, and tools I use to bring ideas to life.</p>
        </div>
        <div className="home-skills-desktop"><SkillGrid skills={skills} /></div>
        <div className="home-skills-mobile">
          <div className="home-skills-preview"><SkillGrid skills={skills.slice(0, 4)} /></div>
          <details className="home-skills-mobile-disclosure">
            <summary>
              <span>View all {skills.length} skills</span>
              <span className="home-skills-chevron" aria-hidden="true">⌄</span>
            </summary>
            <div className="home-skills-mobile-content"><SkillGrid skills={skills.slice(4)} /></div>
          </details>
        </div>
      </section>

      <section className="section-block" id="projects" aria-labelledby="projects-title">
        <div className="home-work-intro">
          <div className="page-intro">
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title">Projects</h2>
            <p className="intro-copy">Software, AI, data, and design projects.</p>
          </div>
          <span className="work-count">{String(featuredProjects.length).padStart(2, "0")} featured</span>
        </div>
        {heroVariant === "default" && <ProjectConsoleHero projects={featuredProjects} />}
        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="featured" index={index} />
          ))}
        </div>
        <div className="all-projects-link-wrap">
          <a className="button button-secondary" href="/projects">View all projects <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="section-block certifications-section" aria-labelledby="certifications-title">
        <div className="page-intro">
          <p className="eyebrow">Credentials</p>
          <h2 id="certifications-title">Certifications</h2>
        </div>
        <ul className="certification-grid">
          {portfolio.certifications.map((certification) => (
            <li className="certification-card" key={certification.title}>
              <a className="certification-link" href={certification.url} rel="noreferrer" target="_blank">
                <Image alt={certification.alt} className="certification-image" height={160} src={certification.image} width={160} />
                <span className="certification-title">{certification.title}</span>
                <span className="certification-visit">View credential <span aria-hidden="true">↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-block home-contact" id="contact" aria-labelledby="contact-title">
        <div className="page-intro">
          <p className="eyebrow">Say hello</p>
          <h2 id="contact-title">Contact</h2>
        </div>
        <div className="contact-layout">
          <section className="contact-card contact-message-card" aria-label="Email contact">
            <p className="intro-copy">Have an opportunity, collaboration idea, or quick question? I’d be glad to hear from you.</p>
            <EmailActions />
          </section>
          <section className="contact-card contact-connect-card" aria-label="Contact details">
            <ContactDetails />
          </section>
        </div>
      </section>
    </div>
  );
}
