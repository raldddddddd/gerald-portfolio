"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Contact", "contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const changeMenuOpen = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  useEffect(() => {
    const sectionIds = links.map(([, section]) => section);
    let scheduledFrame: number | null = null;

    const updateCurrentSection = () => {
      scheduledFrame = null;
      const activationLine = window.innerHeight * 0.32;
      let activeSection: string = sectionIds[0];
      let activeSectionTop = Number.NEGATIVE_INFINITY;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        const sectionTop = section?.getBoundingClientRect().top;
        if (sectionTop !== undefined && sectionTop <= activationLine && sectionTop > activeSectionTop) {
          activeSection = sectionId;
          activeSectionTop = sectionTop;
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

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      changeMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) changeMenuOpen(false);
    };
    const closeOnDesktopResize = () => {
      if (window.innerWidth > 680) changeMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    window.addEventListener("resize", closeOnDesktopResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      window.removeEventListener("resize", closeOnDesktopResize);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`} ref={headerRef}>
      <a className="wordmark" href={`${pathname === "/" ? "" : "/"}#home`} aria-label="Gerald Andrei Santiago home">
        Gerald Andrei Santiago
      </a>
      <button
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
        onClick={() => changeMenuOpen(!menuOpen)}
        ref={menuButtonRef}
        type="button"
      >
        <span className="menu-line" />
        <span className="menu-line" />
        <span className="menu-line" />
      </button>
      <div className="header-controls" id="site-navigation">
        <nav aria-label="Main navigation" className="nav-links">
          {links.map(([label, section]) => {
            const isCurrent = currentSection === section;
            return (
              <a
                aria-current={isCurrent ? "location" : undefined}
                className={isCurrent ? "is-current" : undefined}
                href={`${pathname === "/" ? "" : "/"}#${section}`}
                onClick={() => changeMenuOpen(false)}
                key={section}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
