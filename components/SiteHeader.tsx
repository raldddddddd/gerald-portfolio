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
    const syncHash = () => {
      const section = window.location.hash.slice(1);
      if (sectionIds.includes(section as (typeof sectionIds)[number])) {
        setCurrentSection(section);
      }
    };

    syncHash();
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections[0]) {
          setCurrentSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: 0 },
    );

    sectionIds.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    window.addEventListener("hashchange", syncHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
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
