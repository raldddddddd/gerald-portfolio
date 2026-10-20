"use client";

import { useScrollReveal } from "@/components/useScrollReveal";
import { portfolio } from "@/data/portfolio";

type Experience = (typeof portfolio.experience)[number];

export function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  const reveal = useScrollReveal(index);

  return (
    <li className="experience-timeline-item">
      <span className="experience-timeline-marker" aria-hidden="true" />
      <article className={`experience-card ${reveal.className}`} ref={reveal.ref} style={reveal.style}>
        <p className="experience-entry-date">{item.dates}</p>
        <h2>{item.organization}</h2>
        <h3>{item.role}</h3>
        <p>{item.description}</p>
      </article>
    </li>
  );
}
