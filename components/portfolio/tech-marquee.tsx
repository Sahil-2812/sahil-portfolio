"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import type { TechLogo } from "@/lib/portfolio-data";

type TechMarqueeProps = {
  items: TechLogo[];
};

function LogoTile({ item }: { item: TechLogo }) {
  return (
    <div className="group flex min-w-[150px] items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-4 grayscale transition hover:scale-[1.03] hover:grayscale-0">
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-7 w-7"
        style={{
          fill: `#${item.icon.hex}`,
          filter: "drop-shadow(0 0 12px rgba(255, 148, 84, 0.22))",
        }}
      >
        <path d={item.icon.path} />
      </svg>
      <span className="text-sm font-semibold tracking-wide">{item.label}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TechLogo[]; reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) {
      return;
    }

    const distance = track.scrollWidth / 2;
    timelineRef.current = gsap.fromTo(
      track,
      { x: reverse ? -distance : 0 },
      {
        x: reverse ? 0 : -distance,
        ease: "none",
        duration: 26,
        repeat: -1,
      },
    );

    const pause = () => timelineRef.current?.pause();
    const play = () => timelineRef.current?.play();

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", play);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", play);
      timelineRef.current?.kill();
    };
  }, [reverse]);

  return (
    <div ref={containerRef} className="mask-fade-x overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-5 py-3">
        {items.concat(items).map((item, index) => (
          <LogoTile key={`${item.label}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TechMarquee({ items }: TechMarqueeProps) {
  const midpoint = useMemo(() => Math.ceil(items.length / 2), [items.length]);

  return (
    <div className="space-y-4">
      <MarqueeRow items={items.slice(0, midpoint)} />
      <MarqueeRow items={items.slice(midpoint)} reverse />
    </div>
  );
}
