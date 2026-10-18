import {
  siDart,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPrisma,
  siPytorch,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { ReactNode } from "react";

const brandIcons: Record<string, SimpleIcon> = {
  Dart: siDart,
  Figma: siFigma,
  Flask: siFlask,
  Flutter: siFlutter,
  Git: siGit,
  JavaScript: siJavascript,
  MySQL: siMysql,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  PyTorch: siPytorch,
  Python: siPython,
  React: siReact,
  TypeScript: siTypescript,
};

type CustomSkill = "Java" | "SQL" | "Azure" | "Power BI";

const customIcons: Record<CustomSkill, ReactNode> = {
  Java: <><path d="M12 2c-2.3 1.8 2.9 2.2.7 4.1M9.5 3.4c-1.5 1.5 2.1 1.8.8 3" /><path d="M6 10.2c3.4-1.1 8.6-1.1 12 0l-1.2 7.3H7.2L6 10.2Z" /><path d="M8 20h8M7 18.2c1.8 1 8.2 1 10 0" /></>,
  SQL: <><ellipse cx="12" cy="5" rx="7.5" ry="3" /><path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 11v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></>,
  Azure: <><path d="m4 16 4.5-9h5l6.5 12H8.5L4 16Z" /><path d="M8.5 7 4 16h8m2-9 5 9" /></>,
  "Power BI": <><path d="M4 19V11h3v8H4Zm6 0V6h3v13h-3Zm6 0V3h3v16h-3Z" /></>,
};

export function SkillIcon({ name }: { name: string }) {
  const icon = brandIcons[name];

  if (icon) {
    return (
      <svg aria-hidden="true" className="skill-icon-svg" viewBox="0 0 24 24" focusable="false">
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }

  const customName = name as CustomSkill;
  return (
    <svg aria-hidden="true" className="skill-icon-svg skill-icon-svg--custom" viewBox="0 0 24 24" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{customIcons[customName]}</g>
    </svg>
  );
}
