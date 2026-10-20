"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { TechnologyBadges } from "@/components/TechnologyBadges";

export function ProjectConsoleHero({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  if (!activeProject) return null;

  return (
    <div className="project-console-stage">
      <aside className="project-console-callout project-console-callout--left" aria-live="polite">
        <span className="console-callout-label">CURRENT FOCUS</span>
        <strong>{String(activeIndex + 1).padStart(2, "0")} <i>/</i> {String(projects.length).padStart(2, "0")}</strong>
        <span className="console-callout-detail">{activeProject.kind}</span>
      </aside>

      <div className="project-console-wrap">
        <section className="project-console" aria-label="Interactive project console">
          <div className="project-console-topbar">
            <div className="console-window-mark" aria-hidden="true"><span /><span /><span /></div>
            <span className="console-path">gerald / selected-work</span>
            <span className="console-live"><i aria-hidden="true" /> PROJECT INDEX</span>
          </div>

          <div className="project-console-tabs" role="group" aria-label="Choose a featured project">
            {projects.map((project, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "console-project-tab is-active" : "console-project-tab"}
                key={project.slug}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span className="console-tab-index">0{index + 1}</span>
                <span>{project.name}</span>
              </button>
            ))}
          </div>

          <div className="project-console-screen" aria-live="polite" aria-atomic="true">
            <div className="console-screen-heading" key={activeProject.slug}>
              <div>
                <p className="console-project-kind"><span>SELECTED PROJECT</span><span>{activeProject.dates}</span></p>
                <h2>{activeProject.name}<span className="console-title-period">.</span></h2>
                <p className="console-project-category">{activeProject.kind}</p>
              </div>
              <span className="console-project-mark" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
            </div>
            <div className="console-screen-bottom">
              <span className="console-tech-label">BUILT WITH</span>
              <TechnologyBadges className="console-tech-list" technologies={activeProject.technologies.slice(0, 4)} />
            </div>
          </div>
          <div className="console-base" aria-hidden="true"><span /></div>
        </section>
        <p className="console-caption"><span>01 — 0{projects.length}</span> A few things I’ve been building</p>
      </div>

      <aside className="project-console-callout project-console-callout--right" aria-live="polite">
        <span className="console-callout-label">MADE WITH</span>
        <TechnologyBadges className="console-callout-tech-list" technologies={activeProject.technologies.slice(0, 3)} />
      </aside>
    </div>
  );
}
