"use client";

import { type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Globe, LayoutDashboard, LineChart, Server, Smartphone, Sparkles } from "lucide-react";

import type { Service } from "@/lib/portfolio-data";

const iconMap: Record<Service["icon"], LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  dashboard: LayoutDashboard,
  seo: LineChart,
  design: Sparkles,
};

type ServicesProps = {
  items: Service[];
  onContact?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function Services({ items, onContact }: ServicesProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {items.map((service, index) => {
        const Icon = iconMap[service.icon];
        return (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="card-panel group flex h-full flex-col p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="link-pill inline-flex h-11 w-11 items-center justify-center border-white/15 bg-white/8 p-0 text-white/90">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {service.includes.map((item) => (
                <li key={item} className="text-xs leading-6 text-white/65 sm:text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={onContact}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)] transition group-hover:gap-2.5"
            >
              Discuss project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </motion.article>
        );
      })}
    </div>
  );
}