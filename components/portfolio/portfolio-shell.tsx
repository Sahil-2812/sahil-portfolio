"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Download, LayoutTemplate, Lightbulb, Mail, Smartphone, X } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SimpleIcon } from "simple-icons";
import { siGithub, siWhatsapp } from "simple-icons";

import { ContactForm } from "@/components/portfolio/contact-form";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { Testimonials } from "@/components/portfolio/testimonials";
import { Reveal } from "@/components/portfolio/reveal";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { TechMarquee } from "@/components/portfolio/tech-marquee";
import { VideoBackdrop } from "@/components/portfolio/video-backdrop";
import {
  heroStats,
  highlights,
  projects,
  skillCategories,
  techLogos,
  testimonials,
} from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";
import { loadVideoSource, playWhenReady } from "@/lib/video-utils";

gsap.registerPlugin(ScrollTrigger);

const highlightCards = [
  {
    title: "Frontend development",
    description: highlights[0],
    icon: LayoutTemplate,
  },
  {
    title: "Web and mobile projects",
    description: highlights[1],
    icon: Smartphone,
  },
  {
    title: "Problem solving mindset",
    description: highlights[2],
    icon: Lightbulb,
  },
] as const;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const VIDEO_SRC = "/video/sahil-hero.mp4";
// How many seconds before the end to start the crossfade
const CROSSFADE_DURATION = 1.5;

const heroSocialActions = [
  {
    label: "GitHub",
    href: siteConfig.githubProfile,
    icon: siGithub,
    kind: "simple",
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedIn,
    icon: null,
    kind: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: null,
    kind: "mail",
  },
  {
    label: "WhatsApp",
    href: "#contact",
    icon: siWhatsapp,
    kind: "simple",
  },
] as const;

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d={icon.path} />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.93 6 2.5 6S0 4.88 0 3.5 1.05 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.18h.07c.67-1.26 2.31-2.58 4.76-2.58 5.09 0 6.03 3.35 6.03 7.7V24h-5v-7.44c0-1.77-.03-4.05-2.47-4.05-2.48 0-2.86 1.94-2.86 3.93V24h-5V8z" />
    </svg>
  );
}

export function PortfolioShell() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Two video elements for seamless crossfade loop
  const videoA = useRef<HTMLVideoElement | null>(null);
  const videoB = useRef<HTMLVideoElement | null>(null);
  const activeVideo = useRef<"a" | "b">("a");

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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isLikelyCrawler = /bot|crawler|spider|google|bing|slurp|duckduck|yandex|baidu|semrush|ahref/i.test(
      ua,
    );
    const delay = isLikelyCrawler ? 0 : 400;
    const timeout = window.setTimeout(() => setLoading(false), delay);
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

  // Hero: load one video first, defer the second, crossfade on timeupdate
  useEffect(() => {
    const vA = videoA.current;
    const vB = videoB.current;
    if (!vA || !vB) return;

    vA.style.opacity = "1";
    vB.style.opacity = "0";
    activeVideo.current = "a";

    let isCrossfading = false;
    let secondaryRequested = false;
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    const requestSecondaryVideo = () => {
      if (secondaryRequested || cancelled) {
        return;
      }
      secondaryRequested = true;
      void loadVideoSource(vB, VIDEO_SRC);
    };

    const runCrossfade = (current: HTMLVideoElement, next: HTMLVideoElement) => {
      const fade = () => {
        if (cancelled || !videoA.current || !videoB.current) {
          return;
        }

        const remaining = current.duration - current.currentTime;
        const ratio = Math.max(0, remaining / CROSSFADE_DURATION);
        current.style.opacity = String(ratio);
        next.style.opacity = String(1 - ratio);

        if (ratio > 0) {
          requestAnimationFrame(fade);
        } else {
          activeVideo.current = activeVideo.current === "a" ? "b" : "a";
          current.pause();
          current.currentTime = 0;
          isCrossfading = false;
        }
      };

      requestAnimationFrame(fade);
    };

    const handleTimeUpdate = () => {
      if (isCrossfading || cancelled) {
        return;
      }

      const current = activeVideo.current === "a" ? vA : vB;
      const next = activeVideo.current === "a" ? vB : vA;

      if (!current.duration || current.duration === Infinity) {
        return;
      }

      const remaining = current.duration - current.currentTime;
      if (remaining > CROSSFADE_DURATION + 8) {
        return;
      }

      if (!secondaryRequested) {
        requestSecondaryVideo();
      }

      if (remaining > CROSSFADE_DURATION) {
        return;
      }

      isCrossfading = true;

      const startCrossfade = () => {
        next.currentTime = 0;
        cleanups.push(playWhenReady(next));
        runCrossfade(current, next);
      };

      if (next.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        startCrossfade();
      } else {
        next.addEventListener("canplay", startCrossfade, { once: true });
      }
    };

    const startPrimary = () => {
      if (cancelled) {
        return;
      }

      vA.currentTime = 0;
      cleanups.push(playWhenReady(vA));
      vA.addEventListener("timeupdate", handleTimeUpdate);
      vB.addEventListener("timeupdate", handleTimeUpdate);
      window.setTimeout(requestSecondaryVideo, 1200);
    };

    if (vA.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPrimary();
    } else {
      vA.addEventListener("canplay", startPrimary, { once: true });
    }

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
      vA.removeEventListener("canplay", startPrimary);
      vA.removeEventListener("timeupdate", handleTimeUpdate);
      vB.removeEventListener("timeupdate", handleTimeUpdate);
      vA.pause();
      vB.pause();
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

      {/* ── Split glass navbar: left · center · right (fixed, always visible) ── */}
      <header ref={headerRef} className="fixed top-3 z-50 w-full px-3 sm:top-4 sm:px-6">
        <div className="relative mx-auto max-w-[1180px]">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="glass-pill flex w-fit max-w-[calc(100%-7.25rem)] items-center gap-2 px-2.5 py-2 sm:max-w-none sm:gap-2.5 sm:px-3 sm:py-2.5 lg:px-5">
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                <span className="relative flex h-3.5 w-5 flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full origin-center rounded-full bg-white transition-transform duration-300 ${
                      menuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full origin-center rounded-full bg-white transition-transform duration-300 ${
                      menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="min-w-0 lg:flex-none"
              >
                <span className="block truncate font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.08em] text-white sm:text-sm lg:text-base">
                  Muhammad Sahil
                </span>
              </Link>
            </div>

            <nav className="glass-pill absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 px-2 py-2 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleAnchorClick(event, item.href)}
                  className="rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/10 hover:text-white xl:px-5 xl:text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={(event) => handleAnchorClick(event, "#contact")}
              className="glass-pill inline-flex shrink-0 items-center gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white lg:hidden"
            >
              Contact
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
              </span>
            </a>

            <a
              href="#contact"
              onClick={(event) => handleAnchorClick(event, "#contact")}
              className="glass-pill hidden shrink-0 items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white lg:flex lg:px-5 lg:py-3 lg:text-sm"
            >
              Contact Us
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight className="h-4 w-4 -rotate-45" />
              </span>
            </a>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <>
                <motion.button
                  type="button"
                  aria-label="Close navigation menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel no-lift absolute left-0 right-0 top-[calc(100%+0.65rem)] z-50 p-4 sm:p-5 lg:hidden"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                      Navigation
                    </p>
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + index * 0.04, duration: 0.35 }}
                        onClick={(event) => handleAnchorClick(event, item.href)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-4 sm:py-3.5 sm:text-sm"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a
                      href="/sahil-cv.pdf"
                      download
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </a>
                    <a
                      href="#contact"
                      onClick={(event) => handleAnchorClick(event, "#contact")}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Full-width Hero ── */}
      <section
        id="home"
        className="section-anchor relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 text-center sm:pb-32 sm:pt-40"
      >
        {/* Background video — crossfade loop */}
        <video
          ref={videoA}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 }}
        />
        <video
          ref={videoB}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />
        {/* Dark overlay — strong enough for white text to pop */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Full bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Subtle color accents */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8">

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80"
          >
            Web · Mobile · Software Engineering
          </motion.div>

          {/* Primary heading — name for SEO and clarity */}
          <BlurRevealText
            text={siteConfig.name}
            className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl"
            delay={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.85 }}
            className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-white/90 sm:text-3xl"
          >
            Building things. Solving problems.
          </motion.p>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.95 }}
            className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8"
          >
            Software engineering student — I design and develop web interfaces and mobile apps that
            are fast, accessible, and built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.05 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              onClick={(event) => handleAnchorClick(event, "#projects")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              onClick={(event) => handleAnchorClick(event, "#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-transform hover:scale-[1.03]"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="mt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          >
            {heroStats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-white/55 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>

        {/* Social icon strip — bottom-right, covers watermark area */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-0 right-0 z-10 flex items-center gap-px overflow-hidden rounded-tl-[28px] border-l border-t border-white/10 bg-white/10 px-1.5 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.16)] backdrop-blur-3xl saturate-150"
        >
          {heroSocialActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={action.label}
              onClick={
                action.href.startsWith("#")
                  ? (event) => handleAnchorClick(event, action.href)
                  : undefined
              }
              className="group flex h-14 w-14 items-center justify-center rounded-2xl text-white/55 transition-all duration-200 hover:bg-white/12 hover:text-white sm:h-16 sm:w-16"
            >
              {action.kind === "simple" && action.icon ? (
                <BrandIcon icon={action.icon} />
              ) : action.kind === "linkedin" ? (
                <LinkedInIcon />
              ) : (
                <Mail className="h-6 w-6 stroke-[1.7]" />
              )}
            </a>
          ))}
        </motion.div>
      </section>

      <main className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-24 pb-0 pt-10 sm:gap-28 sm:pt-14">
        <section id="about" data-reveal className="section-anchor grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About Me"
              title="Software Engineering student focused on practical development."
              description="I build clean websites and app interfaces with a focus on responsiveness, usability, and simple design."
            />
            <Reveal delay={0.08}>
              <div className="glass-panel p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">Education</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                  BS Software Engineering
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Studying software architecture, UI engineering, problem solving, and practical
                  product development.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {highlightCards.map((card, index) => {
              const Icon = card.icon;
              return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`card-panel flex min-h-[200px] flex-col justify-between p-5 sm:min-h-[220px] sm:p-6 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                    0{index + 1}
                  </p>
                  <div className="link-pill inline-flex h-10 w-10 items-center justify-center border-white/15 bg-white/8 p-0 text-white/85">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="font-[family-name:var(--font-display)] text-xl font-semibold leading-8">
                    {card.title}
                  </p>
                  <p className="max-w-[28ch] text-base leading-7 text-[var(--muted)]">{card.description}</p>
                </div>
              </motion.div>
            );
            })}
          </div>
        </section>

        <section id="skills" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Skills"
            title="Skills and tools I use."
            description="A mix of frontend, backend, and app development skills."
          />
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="card-panel p-5 sm:p-6"
              >
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
                          className="h-full rounded-full accent-fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="stack" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Technologies I work with."
            description="Hover the logos to pause the animation."
          />
          <Reveal delay={0.1}>
            <div className="glass-panel no-lift marquee-shell px-3 py-4 sm:px-5 sm:py-5">
              <TechMarquee items={techLogos} />
            </div>
          </Reveal>
        </section>

        <section id="projects" data-reveal className="section-anchor space-y-10">
          <SectionHeading
            eyebrow="Projects"
            title="Selected projects."
            description="Professional client work, academic builds, and live products—including realhopepakistan.com."
          />
          <Reveal delay={0.06}>
            <ProjectGrid projects={projects} />
          </Reveal>
        </section>

        <section id="testimonials" data-reveal className="section-anchor space-y-10">
          <Reveal delay={0.08}>
            <Testimonials items={testimonials} />
          </Reveal>
        </section>
      </main>

      <VideoBackdrop className="mt-0">
        <div className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-10 pb-14 pt-16 sm:gap-12 sm:pb-16 sm:pt-20">
          <section id="contact" data-reveal className="section-anchor space-y-8 sm:space-y-10">
            <SectionHeading
              eyebrow="Contact"
              title="Get in touch."
              description="Feel free to contact me for projects, internships, or collaboration."
              inverted
            />
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </section>

          <Reveal delay={0.08}>
            <footer className="relative">
              <div className="glass-panel flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Muhammad Sahil
                </p>
                <p className="text-sm text-white/65">
                  Software Engineering Student | Web and Mobile App Developer
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/75">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
                <span className="text-white/55">{siteConfig.location.label}</span>
                <a
                  href="#home"
                  onClick={(event) => handleAnchorClick(event, "#home")}
                  className="hover:text-white"
                >
                  Back to top
                </a>
              </div>
              </div>
            </footer>
          </Reveal>
        </div>
      </VideoBackdrop>
    </div>
  );
}

// ── Progressive Blur Reveal ──────────────────────────────────────────────────
// Splits text into words and animates each one from blurred+faded to clear,
// staggered so they reveal left-to-right in a smooth wave.

interface BlurRevealTextProps {
  text: string;
  className?: string;
  delay?: number;       // initial delay before the wave starts (seconds)
  stagger?: number;     // gap between each word (seconds)
  duration?: number;    // per-word animation duration (seconds)
}

function BlurRevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.65,
}: BlurRevealTextProps) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, filter: "blur(16px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
