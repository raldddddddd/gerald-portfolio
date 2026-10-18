"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SkillsReveal({ children }: { children: ReactNode }) {
  const revealRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`skills-reveal${ready ? " is-ready" : ""}${visible ? " is-visible" : ""}`}
      ref={revealRef}
    >
      {children}
    </div>
  );
}
