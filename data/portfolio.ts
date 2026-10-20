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
  figmaUrl?: string;
  image: string;
  images?: { src: string; alt: string }[];
  imagesPerSlide?: number;
  imageIntervalMs?: number;
  featured?: boolean;
};

export type Certification = {
  title: string;
  image: string;
  alt: string;
  url: string;
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
    Languages: ["Python", "Swift", "Java", "JavaScript", "TypeScript", "Dart", "PHP", "SQL"],
    "Data science": ["pandas", "NumPy", "scikit-learn", "Jupyter"],
    "Frameworks & libraries": ["PyTorch", "Flutter", "Next.js", "React", "Node.js", "Flask"],
    "Databases & tools": ["PostgreSQL", "MySQL", "Prisma", "Git", "Azure", "Power BI", "Figma"],
  },
  certifications: [
    {
      title: "Microsoft Certified: Azure Fundamentals",
      image: "/certifications/azure-fundamentals.svg",
      alt: "Microsoft Certified Fundamentals badge for Azure Fundamentals.",
      url: "https://learn.microsoft.com/en-us/users/geraldsantiago-1587/credentials/d8ae20d901ff7012?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    },
    {
      title: "Discovering Entrepreneurship",
      image: "/certifications/discovering-entrepreneurship.png",
      alt: "Cisco Networking Academy verified badge for Discovering Entrepreneurship.",
      url: "https://www.credly.com/badges/a96c4310-98b4-4402-9bfc-736766b3d2ca/linked_in_profile",
    },
    {
      title: "Introduction to Data Science",
      image: "/certifications/introduction-to-data-science.png",
      alt: "Cisco Networking Academy badge for Introduction to Data Science.",
      url: "https://www.credly.com/badges/1d8fde0c-eb4c-4629-9c2d-3e4fd37c5ee3/linked_in_profile",
    },
    {
      title: "Introduction to Cybersecurity",
      image: "/certifications/introduction-to-cybersecurity.png",
      alt: "Cisco Networking Academy badge for Introduction to Cybersecurity.",
      url: "https://www.credly.com/badges/889610ea-0a97-41e6-ba83-7169772a4a68/linked_in_profile",
    },
    {
      title: "CCNA: Introduction to Networks",
      image: "/certifications/ccna-introduction-to-networks.png",
      alt: "Cisco Networking Academy verified badge for CCNA: Introduction to Networks.",
      url: "https://www.credly.com/badges/c1df00db-a771-41a8-b5f2-262a4d3cbbcc/linked_in_profile",
    },
  ] satisfies Certification[],
  projects: [
    {
      slug: "inbetween",
      name: "Inbetween",
      kind: "Personal project",
      category: "software",
      dates: "September 2026 – October 2026",
      description: "A local-first macOS menu bar companion for Codex that tracks wait sessions and activity, with history and productivity insights. It uses Apple Natural Language and sentence embeddings for local activity classification, and connects Python lifecycle hooks to Swift over Unix domain sockets.",
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
      description: "A computer-vision system for contactless pig assessment from RGB images, covering view suitability, skin-condition classification, and live-weight estimation, with inference integrated into a Flutter app. Models were trained and evaluated on custom and public datasets, with validated annotations and source-grouped splits to reduce data leakage.",
      technologies: ["Python", "Computer vision", "Machine learning", "Flutter"],
      githubUrl: "https://github.com/iofrmnowhere/instaham",
      liveUrl: "",
      image: "",
      images: [
        { src: "/THE02.png", alt: "InstaHAM home screen with scan overview and recent pig assessments" },
        { src: "/THE02%20(1).png", alt: "InstaHAM weight capture screen prompting the user to select a measurement reference" },
        { src: "/THE02%20(2).png", alt: "InstaHAM review screen for confirming a pig photo" },
        { src: "/THE02%20(3).png", alt: "InstaHAM notice explaining that a photo was not recognized" },
        { src: "/THE02%20(4).png", alt: "InstaHAM reference verification screen with measurement endpoints marked" },
        { src: "/THE02%20(5).png", alt: "InstaHAM scan details showing estimated weight and visual health results" },
        { src: "/THE02%20(6).png", alt: "InstaHAM folders screen summarizing farm scan records" },
        { src: "/THE02%20(7).png", alt: "InstaHAM analytics screen with weight and health summaries" },
        { src: "/THE02%20(8).png", alt: "InstaHAM privacy and data settings" },
      ],
      imagesPerSlide: 3,
      imageIntervalMs: 7000,
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
    {
      slug: "stray-on-track",
      name: "Stray On Track",
      kind: "Human-Computer Interaction Final Project",
      category: "software",
      dates: "May 2026",
      description: "A community-driven mobile app concept for stray animal welfare, with tools for reporting strays, coordinating feeding assistance, matching lost pets, and encouraging participation through gamified engagement. Led the product vision and collaborated with a four-person team to design end-to-end experiences in Figma, from user flows and wireframes to high-fidelity interfaces, onboarding, and interaction patterns.",
      technologies: ["Figma", "Interaction Design", "Prototyping", "User Flows"],
      githubUrl: "",
      liveUrl: "",
      figmaUrl: "https://www.figma.com/design/3f78ui2qSF6VDWOBbyaccY/Stray-on-Track?node-id=0-1&p=f",
      image: "",
      images: [
        { src: "/stray-on-track-intro.png", alt: "Stray On Track onboarding screen introducing the community animal-welfare app" },
        { src: "/stray-on-track-home.png", alt: "Stray On Track home screen with community actions and nearby stray profiles" },
        { src: "/stray-on-track-map.png", alt: "Map view showing a nearby stray and location search" },
        { src: "/stray-on-track-report.png", alt: "Report a Stray photo capture screen" },
        { src: "/stray-on-track-analysis.png", alt: "AI analysis step for identifying a reported stray" },
        { src: "/stray-on-track-profile.png", alt: "Stray profile with feeding, health update, emergency, and matching actions" },
        { src: "/stray-on-track-feed.png", alt: "Feed a Stray flow for selecting food or water and adding proof photos" },
        { src: "/stray-on-track-emergency.png", alt: "Report Emergency form for adding photos, a description, and location" },
        { src: "/stray-on-track-notify.png", alt: "Confirmation screen showing nearby users were notified about an emergency" },
      ],
      imagesPerSlide: 3,
      imageIntervalMs: 7000,
    },
  ] satisfies Project[],
  experience: [
    {
      organization: "Inari Amertron Inc.",
      role: "MIS Intern",
      location: "Clark Freeport, Angeles, Pampanga",
      dates: "June 2026 – July 2026",
      description: "Collaborated with the MIS team to redevelop EDAS, an internal web app for document change requests, review and approval workflows, controlled documents, and implementation tracking. Contributed to its modernization using PHP, HTML, CSS, JavaScript, and MySQL in an MVC-style structure.",
      technologies: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    },
  ],
  contact: {
    email: "santiagogeraldandrei@gmail.com",
    github: "https://github.com/raldddddddd",
    linkedin: "https://www.linkedin.com/in/gerald-andrei-santiago/",
  },
};
