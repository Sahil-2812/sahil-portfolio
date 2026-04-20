"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Menu, Sparkles } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ContactForm } from "@/components/portfolio/contact-form";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { TechMarquee } from "@/components/portfolio/tech-marquee";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import {
  heroStats,
  highlights,
  projects,
  skillCategories,
  techLogos,
} from "@/lib/portfolio-data";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function PortfolioShell() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (hash: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const section = document.querySelector<HTMLElement>(hash);
    if (!section) {
      return;
    }

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const headerTop = 16;
    const extraGap = 20;
    const top =
      window.scrollY + section.getBoundingClientRect().top - headerHeight - headerTop - extraGap;

    window.history.replaceState(null, "", hash);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(hash);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const root = shellRef.current;
    if (!root) {
      return;
    }

    const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const context = gsap.context(() => {
      revealItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const handleHashNavigation = () => {
      if (!window.location.hash) {
        return;
      }

      window.setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 0);
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, []);

  return (
    <div ref={shellRef} className="relative overflow-x-clip">
      <ScrollProgress />

      <motion.div
        initial={false}
        animate={loading ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
        className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[var(--background)]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full border border-[var(--border)] border-t-[var(--primary)] animate-spin" />
          <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.4em] text-[var(--muted)]">
            Loading
          </p>
        </div>
      </motion.div>

      <header
        ref={headerRef}
        className="sticky top-4 z-40 mx-auto w-[min(1180px,calc(100%-1.5rem))] pt-4"
      >
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <Link href="/" className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
            Muhammad Sahil
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleAnchorClick(event, item.href)}
                className="text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/sahil-cv.pdf"
              download
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)] sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="glass-panel mt-3 flex flex-col gap-3 rounded-[28px] px-5 py-4 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleAnchorClick(event, item.href)}
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-24 pb-20 pt-10 sm:gap-28 sm:pt-14">
        <section
          id="home"
          className="relative section-anchor section-grid noise-overlay overflow-hidden rounded-[28px] px-4 py-8 sm:rounded-[40px] sm:px-10 sm:py-14"
        >
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[var(--primary-soft)] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[color:rgba(97,245,196,0.16)] blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                Software Engineering Student
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                  className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-6xl"
                >
                  Muhammad Sahil
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
                  className="max-w-2xl text-lg leading-8 text-[var(--muted)]"
                >
                  Web Developer and Mobile App Developer.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <a
                  href="#projects"
                  onClick={(event) => handleAnchorClick(event, "#projects")}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleAnchorClick(event, "#contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold"
                >
                  Contact Me
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.22 }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {heroStats.map((item) => (
                  <div key={item.label} className="glass-panel rounded-[24px] p-5">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="glass-panel relative min-w-0 rounded-[28px] p-4 sm:rounded-[36px] sm:p-6"
            >
              <div className="absolute inset-4 rounded-[22px] border border-white/10 sm:inset-6 sm:rounded-[28px]" />
              <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(255,148,84,0.16),transparent_38%),linear-gradient(315deg,rgba(97,245,196,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 sm:rounded-[28px] sm:p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Profile Image</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  Muhammad Sahil
                </p>

                <div className="mt-8 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                    <Image
                      src="/myimage.jpg"
                      alt="Muhammad Sahil profile photo"
                      fill
                      priority
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 36vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-[20px] border border-[var(--border)] p-4 sm:rounded-[24px] sm:p-5">
                  <div className="flex min-w-0 items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[var(--primary)]" />
                    <span className="min-w-0 break-all text-xs sm:text-sm">
                      maliksahil10996@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" data-reveal className="section-anchor grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About Me"
              title="Software Engineering student focused on practical development."
              description="I build clean websites and app interfaces with a focus on responsiveness, usability, and simple design."
            />
            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">Education</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                BS Software Engineering
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Studying software architecture, UI engineering, problem solving, and practical
                product development.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`card-panel flex min-h-[220px] flex-col justify-between rounded-[28px] p-6 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                    0{index + 1}
                  </p>
                  <div className="h-10 w-10 rounded-full bg-[var(--primary-soft)]" />
                </div>
                <div className="space-y-4">
                  <p className="font-[family-name:var(--font-display)] text-xl font-semibold leading-8">
                    {index === 0
                      ? "Frontend development"
                      : index === 1
                        ? "Web and mobile projects"
                        : "Problem solving mindset"}
                  </p>
                  <p className="max-w-[28ch] text-base leading-7 text-[var(--muted)]">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Skills"
            title="Skills and tools I use."
            description="A mix of frontend, backend, and app development skills."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title} className="card-panel rounded-[30px] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{category.description}</p>
                <div className="mt-6 space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>{skill.label}</span>
                        <span className="text-[var(--muted)]">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[color:rgba(148,163,184,0.18)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full brand-gradient"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="stack" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Technologies I work with."
            description="Hover the logos to pause the animation."
          />
          <div className="glass-panel rounded-[34px] p-6 sm:p-8">
            <TechMarquee items={techLogos} />
          </div>
        </section>

        <section id="projects" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Projects"
            title="Selected projects."
            description="A few web and app projects I have worked on."
          />
          <ProjectGrid projects={projects} />
        </section>

        <section id="contact" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch."
            description="Feel free to contact me for projects, internships, or collaboration."
          />
          <ContactForm />
        </section>
      </main>

      <footer className="mx-auto mb-8 w-[min(1180px,calc(100%-1.5rem))]">
        <div className="glass-panel flex flex-col gap-4 rounded-[28px] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Muhammad Sahil
            </p>
            <p className="text-sm text-[var(--muted)]">
              Software Engineering Student | Web and Mobile App Developer
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:maliksahil10996@gmail.com" className="hover:text-[var(--primary)]">
              maliksahil10996@gmail.com
            </a>
            <a
              href="#home"
              onClick={(event) => handleAnchorClick(event, "#home")}
              className="hover:text-[var(--primary)]"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
