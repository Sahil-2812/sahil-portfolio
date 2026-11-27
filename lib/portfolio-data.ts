import type { SimpleIcon } from "simple-icons";

import { siteConfig } from "@/lib/site";
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
  slug: string;
  segment: "professional" | "academic";
  employer?: string;
  category: "web" | "fullstack" | "mobile";
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
};

export type TechLogo = {
  label: string;
  icon: SimpleIcon;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
};

export const testimonialStats = [
  { value: "98%", label: "Client satisfaction" },
  { value: "12+", label: "Projects" },
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Sahil helped us ship the Royal Drinking Water customer and rider apps plus the admin dashboard on a tight timeline. He understands APIs, mobile UX, and how to keep delivery workflows clear for riders and customers.",
    name: "Hassan R.",
    role: "Product Lead",
    company: "Arswift Pvt. Ltd.",
  },
  {
    id: "t2",
    quote:
      "Reliable on the Caravan Store stack—Next.js storefront, Firebase auth, and backend integration. Communication was clear, and he handled German-market content and dashboard flows without constant hand-holding.",
    name: "Markus W.",
    role: "Project Manager",
    company: "Caravan Store (Germany)",
  },
  {
    id: "t3",
    quote:
      "Strong full-stack contributor on GoldSilver.de: frontend polish, admin tooling, and SEO-minded page structure. He picks up Node/MongoDB APIs quickly and keeps the UX consistent across content sections.",
    name: "Aisha K.",
    role: "Engineering Manager",
    company: "Arswift Pvt. Ltd.",
  },
  {
    id: "t4",
    quote:
      "He rebuilt our nonprofit site with a clean donation flow and ministry pages that are easy for our team to extend. Fast iterations and attention to accessibility made the launch smooth.",
    name: "Pastor Zeeshan",
    role: "In-Country Director",
    company: "Real Hope Ministries Pakistan",
  },
  {
    id: "t5",
    quote:
      "As a teammate on a class full-stack project, Sahil owned the attendance dashboard and reporting screens. His React components were tidy, and he documented the API integration well for the rest of the group.",
    name: "Usman A.",
    role: "Software Engineering Student",
    company: "University Project Team",
  },
  {
    id: "t6",
    quote:
      "Would work with him again on any React Native or Next.js assignment. He debugs calmly, writes readable code, and actually finishes the admin edge cases most juniors skip.",
    name: "Sara M.",
    role: "Senior Developer",
    company: "Freelance Client",
  },
];

export const heroStats = [
  { label: "Projects Built", value: "12+" },
  { label: "Skills", value: "Web + Mobile" },
  { label: "Education", value: "Software Engineering" },
];

export const highlights = [
  "Builds production web apps, dashboards, and React Native clients.",
  "Ships full-stack features with APIs, auth, and admin tooling.",
  "Focused on clear UX, maintainable code, and real business workflows.",
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
      { label: "React Native", level: 84 },
      { label: "Expo", level: 77 },
      { label: "Mobile UX", level: 88 },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Royal Drinking Water Platform",
    slug: "royal-drinking-water",
    segment: "professional",
    employer: "Arswift Pvt. Ltd.",
    category: "fullstack",
    description:
      "End-to-end water delivery platform for Royal Drinking Water: React Native customer app (signup, OTP, orders, wallet, payments), RoyalRider app for trips, deliveries, earnings, and cash collection, plus a Next.js admin dashboard for customers, colonies, inventory, riders, trips, expenses, and reports—wired to a Node/Express + MySQL API.",
    techStack: [
      "React Native",
      "Next.js",
      "Node.js",
      "Express",
      "MySQL",
      "Redux Toolkit",
    ],
    liveUrl: "https://royaldrinkingwater.com",
    image: "/projects/royal-water-preview.svg",
  },
  {
    title: "GoldSilver.de",
    slug: "goldsilver-de",
    segment: "professional",
    employer: "Arswift Pvt. Ltd.",
    category: "fullstack",
    description:
      "German-focused precious-metals content and affiliate platform: topical landing pages, live price and Fear & Greed widgets, news and review hubs, customer accounts (saved articles, subscriptions), and an admin console for news, subscribers, content pages, affiliates, and analytics—powered by a Node/MongoDB API with scheduled content agents.",
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Chart.js", "SEO"],
    liveUrl: "https://www.goldsilver.de",
    image: "/projects/goldsilver-preview.svg",
  },
  {
    title: "Caravan Store",
    slug: "caravan-store",
    segment: "professional",
    employer: "Client — Germany",
    category: "fullstack",
    description:
      "German motorhome and caravan dealership stack: Next.js public site for buying, renting, and selling vehicles (catalog, blog, FAQ, affiliate, newsletter), customer and admin dashboards, Firebase authentication with Google sign-in, and an Express + Prisma/MySQL API with vehicle media and booking flows.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Node.js",
      "Prisma",
      "MySQL",
    ],
    liveUrl: "https://www.caravan-store.de",
    image: "/projects/caravan-store-preview.svg",
  },
  {
    title: "E-Commerce Web App",
    slug: "ecommerce-web-app",
    segment: "academic",
    category: "fullstack",
    description:
      "Full-stack online store with product browsing, cart flow, and checkout-oriented UI — built to practice catalog management, authenticated sessions, and order data handling with a modern React stack.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    image: "/projects/ecommerce-preview.svg",
  },
  {
    title: "Attendance Management System",
    slug: "attendance-management-system",
    segment: "academic",
    category: "fullstack",
    description:
      "Employee attendance application with daily check-in tracking, admin dashboard views, attendance history, and reporting workflows — integrated with a backend API for roles, records, and management actions.",
    techStack: ["Next.js", "React", "Node.js", "MySQL", "Tailwind CSS"],
    image: "/projects/attendance-preview.svg",
  },
  {
    title: "Real Hope Pakistan",
    slug: "real-hope-pakistan",
    segment: "professional",
    employer: "Real Hope Ministries Pakistan",
    category: "web",
    description:
      "Humanitarian outreach website for Real Hope Pakistan: ministry and project pages (clean water, food, freedom from slavery, widows, orphans, and more), donation tiers, impact metrics, field stories, and contact details for Faisalabad HQ.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Responsive UI"],
    liveUrl: "https://realhopepakistan.com",
    image: "/projects/real-hope-preview.svg",
  },
];

export const socialLinks = [
  { label: "GitHub", href: siteConfig.githubProfile },
  { label: "LinkedIn", href: siteConfig.linkedIn },
  { label: "Email", href: `mailto:${siteConfig.email}` },
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