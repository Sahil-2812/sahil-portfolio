"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { useMemo, useState } from "react";

import type { Project } from "@/lib/portfolio-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Mobile", value: "mobile" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                active
                  ? "border-transparent bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group card-panel overflow-hidden rounded-[28px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-5 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                      {project.title}
                    </h3>
                    <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
                  >
                    <GitBranch className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
