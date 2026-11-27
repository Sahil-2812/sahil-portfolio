"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { testimonialStats, type Testimonial } from "@/lib/portfolio-data";

type TestimonialsProps = {
  items: Testimonial[];
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[var(--primary)] text-[var(--primary)]" />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const subtitle = item.company ? `${item.role} · ${item.company}` : item.role;

  return (
    <article className="card-panel flex h-full min-h-[280px] flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <StarRow />
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-[var(--primary)]">
          <Quote className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <p className="mt-5 flex-1 font-[family-name:var(--font-body)] text-sm italic leading-7 text-white/75 sm:text-[15px] sm:leading-8">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-bold text-white/90"
          aria-hidden
        >
          {initials(item.name)}
        </span>
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">{item.name}</p>
          <p className="mt-0.5 text-xs text-[var(--primary)] sm:text-sm">{subtitle}</p>
        </div>
      </footer>
    </article>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const slides = useMemo(() => {
    const chunks: Testimonial[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      chunks.push(items.slice(i, i + 2));
    }
    return chunks;
  }, [items]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileCard, setMobileCard] = useState(0);
  const slideCount = slides.length;
  const mobileCount = items.length;

  useEffect(() => {
    if (slideCount <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (mobileCount <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setMobileCard((current) => (current + 1) % mobileCount);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [mobileCount]);

  return (
    <div className="section-grid relative overflow-hidden rounded-[clamp(1rem,2.5vw,1.5rem)] border border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(300px,0.46fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="space-y-6 lg:space-y-8">
          <span className="glass-pill inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            Client Testimonials
          </span>
          <div className="space-y-1">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built on trust.
            </h2>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--primary)] sm:text-4xl">
              Backed by delivery.
            </p>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
            Feedback from teams and clients reflects the quality, communication, and long-term problem
            solving I aim to bring to every web, mobile, and dashboard project.
          </p>
          <div className="flex flex-nowrap items-center gap-5 border-t border-white/10 pt-6 sm:gap-8">
            {testimonialStats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 ? (
                  <span className="h-10 w-px shrink-0 bg-white/15" aria-hidden />
                ) : null}
                <div className="shrink-0">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums leading-none text-[var(--primary)] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[9.5rem] text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-white/50 sm:max-w-none sm:tracking-[0.18em]">
                    {stat.label}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="hidden sm:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-4"
              >
                {slides[activeSlide]?.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileCard}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <TestimonialCard item={items[mobileCard]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 sm:justify-end">
            {slides.map((_, index) => {
              const active = index === activeSlide;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show testimonial slide ${index + 1}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-[var(--primary)]" : "w-2.5 bg-white/25 hover:bg-white/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}