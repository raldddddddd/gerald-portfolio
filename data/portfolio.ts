export type Project = {
  slug: string;
  name: string;
  kind: string;
  category: "software" | "data";
  dates: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  images?: { src: string; alt: string }[];
  featured?: boolean;
};

export const portfolio = {
  name: "Gerald Andrei D. Santiago",
  initials: "GS",
  headline: "Software Development · AI & Data Science",
  intro: "Computer Science student majoring in Data Science at Angeles University Foundation.",
  homeDescription:
    "I build software across web, macOS, and mobile, with interests in practical AI and data-driven problem solving.",
  education: {
    school: "Angeles University Foundation",
    location: "Angeles City, Pampanga",
    degree: "Bachelor of Science in Computer Science, Major in Data Science",
    dates: "2023 – Present",
    distinction: "University Scholar",
    gwa: "95.42",
    coursework: [
      "Software Engineering",
      "Object-Oriented Programming",
      "Information Management",
      "Human-Computer Interaction",
      "Mobile Development",
      "Agentic AI",
      "Technopreneurship",
    ],
  },
  skills: {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "Dart", "PHP", "SQL"],
    "Frameworks & libraries": ["Flutter", "Next.js", "React", "Node.js", "Flask", "PyTorch"],
    "Databases & tools": ["PostgreSQL", "MySQL", "Prisma", "Git", "Azure", "Power BI", "Figma"],
    Certifications: [
      "Microsoft Certified: Azure Fundamentals",
      "Cisco Introduction to Data Science",
      "Cisco Introduction to Cybersecurity",
    ],
  } as Record<string, string[]>,
  projects: [
    {
      slug: "inbetween",
      name: "Inbetween",
      kind: "Personal project",
      category: "software",
      dates: "September 2026 – October 2026",
      description: "A local-first macOS menu bar companion for Codex that tracks wait sessions, captures limited foreground activity, and helps you review productive and distracted time. Includes history and optional AI-powered reflections.",
      technologies: ["Swift", "Python", "Apple Natural Language", "Unix domain sockets"],
      githubUrl: "https://github.com/raldddddddd/inbetween",
      liveUrl: "",
      image: "",
      images: [
        { src: "/inbetween-overview.png", alt: "Inbetween overview showing a current Codex wait and weekly activity summary" },
        { src: "/inbetween-reflection.png", alt: "Inbetween Reflection with a seven-day activity summary and question suggestions" },
        { src: "/inbetween-reflection-today.png", alt: "Inbetween Reflection filtered to today's activity" },
      ],
      featured: true,
    },
    {
      slug: "instaham",
      name: "InstaHAM",
      kind: "Thesis project",
      category: "data",
      dates: "January 2026 – October 2026",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
      technologies: ["Python", "Computer vision", "Machine learning", "Flutter"],
      githubUrl: "",
      liveUrl: "",
      image: "",
      featured: true,
    },
    {
      slug: "pop-hop",
      name: "Pop Hop",
      kind: "HackForAll hackathon · Third place overall",
      category: "software",
      dates: "April 2026",
      description: "An all-in-one flea market platform for organizers and vendors in Angeles City, Pampanga, with event applications, booth assignments, payment tracking, and announcements.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "JWT"],
      githubUrl: "",
      liveUrl: "https://pop-hop-rwdz.vercel.app/",
      image: "/pop-hop-preview.jpg",
      featured: true,
    },
  ] satisfies Project[],
  experience: [
    {
      organization: "Inari Amertron Inc.",
      role: "MIS Intern",
      location: "Clark Freeport, Angeles, Pampanga",
      dates: "June 2026 – July 2026",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
      technologies: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    },
  ],
  contact: {
    email: "santiagogeraldandrei@gmail.com",
    github: "https://github.com/raldddddddd",
    linkedin: "https://www.linkedin.com/in/gerald-andrei-santiago/",
  },
};
