import {
  siApple,
  siCss,
  siDart,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siHtml5,
  siJupyter,
  siJsonwebtokens,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPhp,
  siPostgresql,
  siPrisma,
  siPytorch,
  siPython,
  siReact,
  siSwift,
  siScikitlearn,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { ReactNode } from "react";

const brandIcons: Record<string, SimpleIcon> = {
  "Apple Natural Language": siApple,
  CSS: siCss,
  Dart: siDart,
  Figma: siFigma,
  Flask: siFlask,
  Flutter: siFlutter,
  Git: siGit,
  HTML: siHtml5,
  JWT: siJsonwebtokens,
  JavaScript: siJavascript,
  Jupyter: siJupyter,
  MySQL: siMysql,
  NumPy: siNumpy,
  pandas: siPandas,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  PyTorch: siPytorch,
  Python: siPython,
  React: siReact,
  "scikit-learn": siScikitlearn,
  Swift: siSwift,
  TypeScript: siTypescript,
};

type CustomSkill = "Java" | "SQL" | "Azure" | "Power BI" | "Unix domain sockets" | "Computer vision" | "Machine learning";

const customIcons: Record<CustomSkill, ReactNode> = {
  Java: <><path d="M12 2c-2.3 1.8 2.9 2.2.7 4.1M9.5 3.4c-1.5 1.5 2.1 1.8.8 3" /><path d="M6 10.2c3.4-1.1 8.6-1.1 12 0l-1.2 7.3H7.2L6 10.2Z" /><path d="M8 20h8M7 18.2c1.8 1 8.2 1 10 0" /></>,
  SQL: <><ellipse cx="12" cy="5" rx="7.5" ry="3" /><path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 11v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></>,
  Azure: <><path d="m4 16 4.5-9h5l6.5 12H8.5L4 16Z" /><path d="M8.5 7 4 16h8m2-9 5 9" /></>,
  "Power BI": <><path d="M4 19V11h3v8H4Zm6 0V6h3v13h-3Zm6 0V3h3v16h-3Z" /></>,
  "Unix domain sockets": <><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="m8.1 10.9 7.7-4m-7.7 6.2 7.7 4" /></>,
  "Computer vision": <><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.8" /></>,
  "Machine learning": <><circle cx="5" cy="6" r="1.7" /><circle cx="5" cy="18" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="6" r="1.7" /><circle cx="19" cy="18" r="1.7" /><path d="m6.5 7.2 4 3.7m-4 5.9 4-3.7m3 0 4 3.7m-4-7.4 4-3.7" /></>,
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
  const customIcon = customIcons[customName] ?? <path d="M8 5 2.5 12 8 19m8-14 5.5 7-5.5 7m-2-16-4 18" />;
  return (
    <svg aria-hidden="true" className="skill-icon-svg skill-icon-svg--custom" viewBox="0 0 24 24" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{customIcon}</g>
    </svg>
  );
}
