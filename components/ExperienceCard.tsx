"use client";

import { TechnologyBadges } from "@/components/TechnologyBadges";
import { useScrollReveal } from "@/components/useScrollReveal";
import { portfolio } from "@/data/portfolio";

type Experience = (typeof portfolio.experience)[number];

export function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  const reveal = useScrollReveal(index);

  return (
    <article className={`experience-card ${reveal.className}`} ref={reveal.ref} style={reveal.style}>
      <div className="card-topline"><span className="eyebrow">{item.dates}</span><span className="card-date">{item.location}</span></div>
      <h2>{item.role}</h2><h3>{item.organization}</h3><p>{item.description}</p>
      <TechnologyBadges className="tag-list" technologies={item.technologies} />
    </article>
  );
}
