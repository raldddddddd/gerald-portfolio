import Image from "next/image";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactSleepingCat } from "@/components/ContactSleepingCat";
import { CatTreeHero } from "@/components/CatTreeHero";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EmailActions } from "@/components/EmailActions";
import { IsometricHeroCatTree, IsometricHeroWindow } from "@/components/IsometricHeroArt";
import { ProjectConsoleHero } from "@/components/ProjectConsoleHero";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillIcon } from "@/components/SkillIcon";
import { portfolio } from "@/data/portfolio";

function SkillMarqueeRow({ skills, reverse = false }: { skills: string[]; reverse?: boolean }) {
  const skillItems = skills.map((skill) => (
    <li className="stack-skill" key={skill}>
      <span className="stack-skill-icon"><SkillIcon name={skill} /></span>
      <span>{skill}</span>
    </li>
  ));

  return (
    <div className={`skill-marquee-row${reverse ? " skill-marquee-row--reverse" : ""}`}>
      <div className="skill-marquee-track">
        <ul className="skill-marquee-group">{skillItems}</ul>
        <ul aria-hidden="true" className="skill-marquee-group">{skillItems}</ul>
      </div>
    </div>
  );
}

export function PortfolioPage({ heroVariant = "default" }: { heroVariant?: "default" | "cats" }) {
  const firstName = portfolio.name.split(" ")[0];
  const projects = portfolio.projects;
  const skills = Object.values(portfolio.skills).flat();
  const skillMidpoint = Math.ceil(skills.length / 2);

  return (
    <div className={`container${heroVariant === "default" ? " portfolio-home" : ""}`}>
      <section className={`home-hero${heroVariant === "default" ? " home-hero-full" : ""}`} id="home" aria-labelledby="home-title">
        {heroVariant === "default" && <IsometricHeroWindow />}
        <div className="home-hero-copy">
          <p className="eyebrow">{heroVariant === "default" ? "Software Development · Full-Stack · AI/ML" : portfolio.headline}</p>
          <h1 className="hero-title" id="home-title">Hi, I’m <span>{firstName}.</span></h1>
          <p className="hero-copy">{portfolio.homeDescription}</p>
          <div className="button-row">
            {heroVariant === "default" ? (
              <>
                <a className="button button-primary hero-contact-button" href="#contact">Get in touch <span aria-hidden="true">→</span></a>
                <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">View CV</a>
              </>
            ) : (
              <a className="button button-secondary" href="#contact">Get in touch</a>
            )}
          </div>
          {heroVariant === "default" && (
            <div className="hero-note hero-note--home">
              <span className="status-dot" />
              <span>Open to opportunities</span>
              <span className="hero-note-divider" aria-hidden="true">·</span>
              <span>B.S. Computer Science · Data Science</span>
            </div>
          )}
          {heroVariant === "cats" && <div className="hero-note"><span className="status-dot" /> Open to opportunities<br /><small>{portfolio.education.degree}</small></div>}
        </div>
        {heroVariant === "default" && <IsometricHeroCatTree />}
        {heroVariant === "cats" && <CatTreeHero />}
        {heroVariant === "default" && (
          <a className="hero-scroll-cue" href="#experience">
            <span>Scroll to explore</span>
            <span aria-hidden="true">↓</span>
          </a>
        )}
      </section>

      <section className="section-block home-about" id="about" aria-labelledby="about-title">
        <div className="page-intro home-about-heading">
          <p className="eyebrow">A little about me</p>
          <h2 id="about-title">About</h2>
        </div>
        <div className="home-about-content">
          <p className="home-about-lead">
            I’m a Computer Science student majoring in Data Science at Angeles University Foundation. I build practical tools across web, macOS, and mobile, with recent work in AI and product design.
          </p>
        </div>
      </section>

      <section className="section-block experience-section" id="experience" aria-labelledby="experience-title">
        <div className="page-intro">
          <p className="eyebrow">Background</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <div className="experience-layout">
          <ol className="experience-timeline">
            {portfolio.experience.map((item, index) => (
              <ExperienceCard key={`${item.organization}-${item.role}`} item={item} index={index} />
            ))}
            <li className="experience-timeline-item experience-education-item">
              <span className="experience-timeline-marker" aria-hidden="true" />
              <article className="education-entry">
                <p className="experience-entry-date">Education · {portfolio.education.dates}</p>
                <h2>{portfolio.education.school}</h2>
                <p>{portfolio.education.degree}</p>
              </article>
            </li>
          </ol>
          <aside className="organizations-panel" aria-labelledby="organizations-title">
            <p className="eyebrow" id="organizations-title">Organizations</p>
            <ul className="organization-list">
              {portfolio.organizations.map((organization) => (
                <li className="organization-card" key={organization.name}>
                  <Image alt={organization.alt} className="organization-logo" height={160} src={organization.logo} width={160} />
                  <div>
                    <h3>{organization.name}</h3>
                    <p>{organization.role}</p>
                    <span className="organization-dates">{organization.dates}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-block home-skills" id="skills" aria-labelledby="skills-title">
        <div className="home-skills-inner">
          <div className="page-intro">
            <p className="eyebrow">My toolkit</p>
            <h2 id="skills-title">Skills & technologies</h2>
            <p className="intro-copy">Languages, data science libraries, frameworks, and tools I use to bring ideas to life.</p>
          </div>
        </div>
        <div className="skill-marquee" aria-label="Technology stack">
          <SkillMarqueeRow skills={skills.slice(0, skillMidpoint)} />
          <SkillMarqueeRow reverse skills={skills.slice(skillMidpoint)} />
        </div>
      </section>

      <section className="section-block" id="projects" aria-labelledby="projects-title">
        <div className="home-work-intro">
          <div className="page-intro">
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title">Projects</h2>
            <p className="intro-copy">Software, AI, data, and design projects.</p>
          </div>
          <span className="work-count">{String(projects.length).padStart(2, "0")} projects</span>
        </div>
        {heroVariant === "default" && <ProjectConsoleHero projects={projects} />}
        {heroVariant === "cats" && (
          <div className="project-grid">
            {projects.filter((project) => project.featured).map((project, index) => (
              <ProjectCard key={project.slug} project={project} variant="featured" index={index} />
            ))}
          </div>
        )}
        <div className="all-projects-link-wrap">
          <a className="button button-secondary" href="/projects">View all projects <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="section-block home-contact" id="contact" aria-labelledby="contact-title">
        <div className="page-intro">
          <p className="eyebrow">Say hello</p>
          <h2 id="contact-title">Contact</h2>
        </div>
        <div className="contact-layout">
          <section className="contact-card contact-message-card" aria-label="Email contact">
            <EmailActions />
          </section>
          <section className="contact-card contact-connect-card" aria-label="Contact details">
            <ContactDetails />
          </section>
        </div>
        <ContactSleepingCat />
      </section>
    </div>
  );
}
