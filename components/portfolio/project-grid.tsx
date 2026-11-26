"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { MouseEvent, useMemo, useRef, useState } from "react";

import type { Project } from "@/lib/portfolio-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Professional", value: "professional" },
  { label: "Academic", value: "academic" },
  { label: "Web", value: "web" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Mobile", value: "mobile" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

function isPublicUrl(url?: string) {
  return Boolean(url && !url.includes("example.com") && url !== "#");
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const showLive = isPublicUrl(project.liveUrl);
  const showGithub = isPublicUrl(project.githubUrl);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: py * -9,
      rotateY: px * 9,
      scale: 1.025,
    });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <motion.article
      id={`project-${project.slug}`}
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
      }}
      className="group glass-panel flex flex-col transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
          {project.segment === "professional" ? "Professional" : project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-4">
        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-white sm:text-lg">
            {project.title}
          </h3>
          {project.employer ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
              {project.employer}
            </p>
          ) : null}
          <p className="line-clamp-3 text-xs leading-6 text-white/65 sm:text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70 sm:text-xs"
            >
              {item}
            </span>
          ))}
          {project.techStack.length > 4 ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50">
              +{project.techStack.length - 4}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          {showLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black sm:text-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live site
            </a>
          ) : (
            <span className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/50">
              Private / NDA
            </span>
          )}
          {showGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} GitHub`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <GitBranch className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {showLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} open`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    if (activeFilter === "professional" || activeFilter === "academic") {
      return projects.filter((project) => project.segment === activeFilter);
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm ${
                active
                  ? "border-white/20 bg-white/12 text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
