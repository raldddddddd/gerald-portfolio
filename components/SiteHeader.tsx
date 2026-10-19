"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  ["Home", "home"],
  ["Projects", "projects"],
  ["About", "about"],
  ["Contact", "contact"],
] as const;

export function SiteHeader() {
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const sectionIds = links.map(([, section]) => section);
    let scheduledFrame: number | null = null;

    const updateCurrentSection = () => {
      scheduledFrame = null;
      const activationLine = window.innerHeight * 0.32;
      let activeSection: string = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          activeSection = sectionId;
        }
      }

      setCurrentSection((current) => current === activeSection ? current : activeSection);
    };

    const scheduleUpdate = () => {
      if (scheduledFrame === null) {
        scheduledFrame = window.requestAnimationFrame(updateCurrentSection);
      }
    };

    updateCurrentSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (scheduledFrame !== null) window.cancelAnimationFrame(scheduledFrame);
    };
  }, []);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Gerald Andrei Santiago home">
        Gerald Andrei Santiago
      </a>
      <nav aria-label="Main navigation" className="nav-links">
        {links.map(([label, section]) => {
          const isCurrent = currentSection === section;
          return (
            <a
              aria-current={isCurrent ? "location" : undefined}
              className={isCurrent ? "is-current" : undefined}
              href={`#${section}`}
              key={section}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
}
