import { ContactDetails } from "@/components/ContactDetails";
import { CatTreeHero } from "@/components/CatTreeHero";
import { ExperienceCard } from "@/components/ExperienceCard";
import { IsometricHeroCatTree, IsometricHeroWindow } from "@/components/IsometricHeroArt";
import { MessageForm } from "@/components/MessageForm";
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
  const skills = Object.entries(portfolio.skills)
    .filter(([group]) => group !== "Certifications")
    .flatMap(([, groupSkills]) => groupSkills);

  return (
    <div className="container">
      <section className={`home-hero${heroVariant === "default" ? " home-hero-full" : ""}`} id="home" aria-labelledby="home-title">
        {heroVariant === "default" && <IsometricHeroWindow />}
        <div className="home-hero-copy">
          {heroVariant === "default" && (
            <div className="construction-note">
              <svg className="construction-tools-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path className="construction-wrench" d="M20.2 2.2a6.6 6.6 0 0 0-8.1 8.4l-9 9a2.2 2.2 0 1 0 3.1 3.1l9-9a6.6 6.6 0 0 0 8.4-8.1l-4.4 4.4-3.7-3.7 4.7-4.1Z" />
                <g transform="translate(-4 0)">
                <g className="construction-hammer">
                  <path
                    className="construction-hammer-head"
                    d="M12.2 8.9 15.3 6.8l-1-1.1c-.8-1-.2-2.2 1-2.2h2.1c.7 0 .8-.5.3-.9C16 1.2 13.3.7 11.2 1.4c-1.2-.5-2.7-.7-4.2-.2-1 .4-1.7 1.1-1.9 2.1-.1 1-.6 1.7-1.6 2.1L1.6 6.9c-.5.4-.5.9-.1 1.3L4 11.7c.4.4.9.3 1.3-.1l1.8-2c1-1.2 2.4-1.3 3.5-.2l1.1 1.1-1.4.3Z"
                    transform="translate(1 3) scale(.8)"
                  />
                  <path
                    className="construction-hammer-handle"
                    d="m10.528 10.558 1.444-1.444 11.2 11.2-1.444 1.444Z"
                  />
                  <path
                    className="construction-hammer-seam"
                    d="m10.528 10.558 1.444-1.444"
                  />
                </g>
                </g>
              </svg>
              <span>Portfolio in progress · Some details are still being updated</span>
            </div>
          )}
          <p className="eyebrow">{heroVariant === "default" ? "Software Development · Full-Stack Engineering & AI/ML" : portfolio.headline}</p>
          <h1 className="hero-title" id="home-title">Hi, I’m <span>{firstName}.</span></h1>
          <p className="hero-copy">{portfolio.homeDescription}</p>
          <div className="button-row">
            <a className="button button-primary" href="#projects">Explore projects <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#contact">Get in touch</a>
          </div>
          {heroVariant === "cats" && <div className="hero-note"><span className="status-dot" /> Open to opportunities<br /><small>{portfolio.education.degree}</small></div>}
        </div>
        {heroVariant === "default" && <IsometricHeroCatTree />}
        {heroVariant === "cats" && <CatTreeHero />}
      </section>

      <section className="section-block" id="projects" aria-labelledby="projects-title">
        <div className="home-work-intro">
          <div className="page-intro">
            <p className="eyebrow">Selected work & experience</p>
            <h2 id="projects-title">Projects</h2>
            <p className="intro-copy">Software, AI, and data projects alongside hands-on experience.</p>
          </div>
          <span className="work-count">{String(portfolio.projects.length).padStart(2, "0")} projects</span>
        </div>
        {heroVariant === "default" && <ProjectConsoleHero projects={portfolio.projects} />}
        <div className="project-grid">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="featured" index={index} />
          ))}
        </div>
        <section className="projects-experience" aria-labelledby="experience-title">
          <div className="page-intro">
            <p className="eyebrow">Work history</p>
            <h3 id="experience-title">Experience</h3>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <ExperienceCard key={`${item.organization}-${item.role}`} item={item} index={index} />
            ))}
          </div>
        </section>
      </section>

      <section className="section-block home-about" id="about" aria-labelledby="about-title">
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

        <section className="home-skills section-block" aria-labelledby="skills-title">
          <div className="page-intro">
            <p className="eyebrow">My toolkit</p>
            <h2 id="skills-title">Skills & technologies</h2>
            <p className="intro-copy">Languages, frameworks, and tools I use to bring ideas to life.</p>
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

        <section className="about-certifications" aria-labelledby="certifications-title">
          <div className="page-intro">
            <p className="eyebrow">Credentials</p>
            <h2 id="certifications-title">Certifications</h2>
          </div>
          <ul className="tag-list">{portfolio.skills.Certifications.map((certification) => <li key={certification}>{certification}</li>)}</ul>
        </section>
      </section>

      <section className="section-block home-contact" id="contact" aria-labelledby="contact-title">
        <div className="page-intro">
          <p className="eyebrow">Say hello</p>
          <h2 id="contact-title">Contact</h2>
          <p className="intro-copy">For opportunities, collaborations, or a quick conversation, send me a message or connect directly.</p>
        </div>
        <div className="contact-layout">
          <section className="contact-card contact-message-card" aria-labelledby="contact-message-title">
            <h3 id="contact-message-title">Send me a message</h3>
            <p>Fill out the form to open a message in your email app.</p>
            <MessageForm />
          </section>
          <section className="contact-card contact-connect-card" aria-label="Contact details">
            <ContactDetails />
          </section>
        </div>
      </section>
    </div>
  );
}
