import { SkillIcon } from "@/components/SkillIcon";

const shortLabels: Record<string, string> = {
  "Apple Natural Language": "Apple NLP",
  "Unix domain sockets": "Unix sockets",
};

export function TechnologyBadges({
  technologies,
  className = "",
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <ul className={`technology-badges${className ? ` ${className}` : ""}`} aria-label="Technologies used">
      {technologies.map((technology) => (
        <li aria-label={technology} className="technology-badge" key={technology} title={technology}>
          <span className="technology-badge-icon"><SkillIcon name={technology} /></span>
          <span>{shortLabels[technology] ?? technology}</span>
        </li>
      ))}
    </ul>
  );
}
