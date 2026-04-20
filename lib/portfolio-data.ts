import type { SimpleIcon } from "simple-icons";
import {
  siAngular,
  siBootstrap,
  siCss,
  siExpo,
  siExpress,
  siFirebase,
  siFramer,
  siGit,
  siGnubash,
  siGsap,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from "simple-icons";

export type SkillCategory = {
  title: string;
  description: string;
  skills: { label: string; level: number }[];
};

export type Project = {
  title: string;
  category: "web" | "fullstack" | "mobile";
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
};

export type TechLogo = {
  label: string;
  icon: SimpleIcon;
};

export const heroStats = [
  { label: "Projects Built", value: "12+" },
  { label: "Skills", value: "Web + Mobile" },
  { label: "Education", value: "Software Engineering" },
];

export const highlights = [
  "Builds responsive websites and clean user interfaces.",
  "Works on web and mobile app projects with modern tools.",
  "Enjoys turning student ideas into practical products.",
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Accessible UI systems, responsive layouts, and performant client experiences.",
    skills: [
      { label: "React", level: 92 },
      { label: "Next.js", level: 89 },
      { label: "HTML", level: 95 },
      { label: "CSS / Tailwind", level: 90 },
      { label: "JavaScript", level: 91 },
    ],
  },
  {
    title: "Backend",
    description: "API integration, auth flows, and data-driven app architecture.",
    skills: [
      { label: "Node.js", level: 82 },
      { label: "Firebase", level: 86 },
      { label: "Express", level: 78 },
      { label: "Supabase", level: 76 },
    ],
  },
  {
    title: "App Development",
    description: "Cross-platform thinking, smooth interaction patterns, and mobile-friendly systems.",
    skills: [
      { label: "React Native Concepts", level: 80 },
      { label: "Expo", level: 77 },
      { label: "Mobile UX", level: 88 },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "E-commerce Web App",
    category: "fullstack",
    description:
      "A conversion-focused storefront with product discovery, cart management, and a clean checkout journey.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce-web-app",
    image: "/projects/ecommerce-preview.svg",
  },
  {
    title: "College Website",
    category: "web",
    description:
      "A modern academic portal with admissions, faculty highlights, event updates, and responsive information architecture.",
    techStack: ["Next.js", "TypeScript", "GSAP", "CSS"],
    liveUrl: "https://example.com/college",
    githubUrl: "https://github.com/example/college-website",
    image: "/projects/college-preview.svg",
  },
  {
    title: "Class Website",
    category: "web",
    description:
      "A collaborative hub for class announcements, schedules, assignments, and shared student resources.",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com/class",
    githubUrl: "https://github.com/example/class-website",
    image: "/projects/class-preview.svg",
  },
  {
    title: "Library Management System",
    category: "fullstack",
    description:
      "A practical admin interface for catalog browsing, issue tracking, member records, and status analytics.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com/library",
    githubUrl: "https://github.com/example/library-management-system",
    image: "/projects/library-preview.svg",
  },
  {
    title: "Notes Sharing App",
    category: "mobile",
    description:
      "A student-first notes platform designed for upload, search, and quick access across subjects and devices.",
    techStack: ["React Native", "Firebase", "Expo"],
    liveUrl: "https://example.com/notes-app",
    githubUrl: "https://github.com/example/notes-sharing-app",
    image: "/projects/notes-preview.svg",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/example" },
  { label: "LinkedIn", href: "https://linkedin.com/in/example" },
  { label: "Email", href: "mailto:maliksahil10996@gmail.com" },
];

export const techLogos: TechLogo[] = [
  { label: "HTML", icon: siHtml5 },
  { label: "CSS", icon: siCss },
  { label: "JavaScript", icon: siJavascript },
  { label: "Bootstrap", icon: siBootstrap },
  { label: "Tailwind", icon: siTailwindcss },
  { label: "React", icon: siReact },
  { label: "Next.js", icon: siNextdotjs },
  { label: "Vue.js", icon: siVuedotjs },
  { label: "Angular", icon: siAngular },
  { label: "Node.js", icon: siNodedotjs },
  { label: "Express", icon: siExpress },
  { label: "Firebase", icon: siFirebase },
  { label: "Supabase", icon: siSupabase },
  { label: "TypeScript", icon: siTypescript },
  { label: "GSAP", icon: siGsap },
  { label: "Framer Motion", icon: siFramer },
  { label: "MongoDB", icon: siMongodb },
  { label: "Expo", icon: siExpo },
  { label: "Git", icon: siGit },
  { label: "Bash", icon: siGnubash },
];
